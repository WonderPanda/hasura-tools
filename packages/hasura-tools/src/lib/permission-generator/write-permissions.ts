import { PermissionGeneratorConfig } from './config';
import { dump, load } from 'js-yaml';
import { Project } from 'ts-morph';
import { scanTables } from './metadata.utils';
import { readFileSync, writeFileSync } from 'fs';
import consola from 'consola';
import { getTablesAndTypes } from './ast';
import { snakeCase } from './utils';

type Columns = string[] | '*';

const keyOrder = [
  'table',
  'object_relationships',
  'array_relationships',
  'computed_fields',
  'insert_permissions',
  'select_permissions',
  'update_permissions',
  'delete_permissions',
  'event_triggers',
];

export type WriteablePermissions = {
  fileName: string;
  permissions: {
    insert_permissions?: {
      role: string;
      permission: {
        check: Record<string, unknown>;
        columns?: Columns;
        backend_only?: boolean;
        set?: Record<string, unknown>;
      };
    }[];
    select_permissions?: {
      role: string;
      permission: {
        filter: Record<string, unknown>;
        columns: Columns | { exclude: string[] };
        backend_only?: boolean;
        limit?: number;
        allow_aggregations?: boolean;
      };
    }[];
    update_permissions?: {
      role: string;
      permission: {
        filter?: Record<string, unknown>;
        check?: Record<string, unknown>;
        columns: Columns;
        backend_only?: boolean;
        set?: Record<string, unknown>;
      };
    }[];
    delete_permissions?: {
      role: string;
      permission: {
        filter?: Record<string, unknown>;
        backend_only?: boolean;
      };
    }[];
  };
}[];

type PolicyViolation = {
  message: string;
};

type PolicyFunc = ({
  permissions,
  tableName,
  columns,
}: {
  tableName: string;
  columns: string[];
  permissions: WriteablePermissions[number]['permissions'] | undefined;
}) => undefined | PolicyViolation;

export type PermissionPolicy = {
  policyName: string;

  /**
   * A predicate function which will be used to determine which tables this policy belongs to. If
   * none is provided then this policy will apply to all tables
   */
  tableFilter?: (tableName: string) => boolean;

  policy: PolicyFunc;
};

/**
 * Processes permissions evaluating any provided policies to make sure that there are no violations
 *
 * If no policy violations are detected, this will write the permissions to their respective Hasura metadata yaml files
 */
export const writePermissions = async (
  config: PermissionGeneratorConfig,
  permissions: WriteablePermissions,
  policies?: PermissionPolicy[]
) => {
  // TODO Optimize this with a pool to write to files in parallel

  const {
    databaseName,
    graphqlTypes,
    pathToHasuraDir,
    namingConvention = 'graphql-default',
    schemaNames = ['public'],
    tableFilter = () => true,
  } = config;

  const { pathToTsConfig, sourceFile } = graphqlTypes;

  const typesProject = new Project({
    tsConfigFilePath: pathToTsConfig,
  });
  const typesFile = typesProject.getSourceFileOrThrow(sourceFile);

  const scannedTables = await scanTables({
    databaseName,
    pathToHasuraDir,
    schemaNames,
  });

  const tableTypes = getTablesAndTypes({
    namingConvention,
    sourceFile: typesFile,
    tables: scannedTables.filter((t) => tableFilter(t.entityName)),
  });

  const evaluatedPolicies = (policies ?? []).map(
    ({ policyName, policy, tableFilter = () => true }) => {
      const relevantTables = tableTypes.filter((t) => tableFilter(t.tableName));
      const potentialPolicyViolations = relevantTables.map(
        ({ tableName, columns, metadataFileName }) => {
          const permissionsForTable = permissions.find(
            (p) => p.fileName === metadataFileName
          );
          return policy({
            tableName,
            columns,
            permissions: permissionsForTable?.permissions,
          });
        }
      );

      return {
        policyName,
        violations: potentialPolicyViolations.filter(
          (x) => x !== undefined
        ) as PolicyViolation[],
      };
    }
  );

  let anyPolicyEvaluationFailed = false;

  evaluatedPolicies.forEach(({ policyName, violations }) => {
    const policyEvaluationFailed = violations.length > 0;
    if (policyEvaluationFailed) {
      anyPolicyEvaluationFailed = true;
      consola.error(
        `Policy '${policyName}' failed with the following violations:`
      );
      violations.forEach((v) => consola.error(`\t${v.message}`));
    } else {
      consola.success(`Policy '${policyName}' passed`);
    }
  });

  if (anyPolicyEvaluationFailed) {
    throw new Error('Policy violations detected');
  }

  for (const { fileName, permissions: p } of permissions) {
    const tableYamlPath = `${pathToHasuraDir}/metadata/databases/${databaseName}/tables/${fileName}`;
    const tableYaml = readFileSync(tableYamlPath, 'utf8');
    const tableYamlJson = load(tableYaml) as Record<string, any>;

    const table = tableTypes.find((t) => t.metadataFileName === fileName);
    if (!table) {
      consola.warn(
        `Could not find matching table for ${fileName}. Is it excluded by your table filter in configuration?`
      );

      return;
    }

    const { columns } = table;
    const normalizedColumns =
      namingConvention === 'graphql-default' ? columns.map(snakeCase) : columns;

    tableYamlJson['insert_permissions'] = p.insert_permissions;
    tableYamlJson['select_permissions'] = (p.select_permissions ?? []).map(
      (p) => {
        // TODO type safety
        const exclude: string[] | undefined = (p.permission.columns as any)[
          'exclude'
        ];
        if (exclude) {
          p.permission.columns = normalizedColumns.filter((c) => !exclude.includes(c));
        }

        return p;
      }
    );
    tableYamlJson['update_permissions'] = p.update_permissions;
    tableYamlJson['delete_permissions'] = p.delete_permissions;

    const yamlString = dump(tableYamlJson, {
      noRefs: true,
      sortKeys: (a, b) => {
        const aIndex = keyOrder.indexOf(a);
        const bIndex = keyOrder.indexOf(b);

        if (aIndex === -1 && bIndex === -1) {
          return 0;
        }

        if (aIndex > 0 && bIndex === -1) {
          return 1;
        }

        if (aIndex > 0 && bIndex > 0) {
          return aIndex < bIndex ? -1 : 1;
        }

        return 1;
      },
    });
    writeFileSync(tableYamlPath, yamlString, 'utf8');
  }
};
