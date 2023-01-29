import { PermissionGeneratorConfig } from './config';
import { dump, load } from 'js-yaml';
import { Project } from 'ts-morph';
import { scanTables } from './metadata.utils';
import { capitalize, flatten } from 'lodash';
import { join } from 'path';
import { readFileSync, writeFileSync } from 'fs';

export const nameFromNamingConvention = (
  namingConvention: PermissionGeneratorConfig['namingConvention'] = 'graphql-default',
  ...words: string[]
) => {
  return namingConvention === 'graphql-default'
    ? words.join('')
    : words.join('_');
};

export const generatePermissionsLibrary = async (
  config: PermissionGeneratorConfig
) => {
  const {
    databaseName,
    outputDir,
    graphqlTypes,
    pathToHasuraDir,
    roles,
    namingConvention = 'graphql-default',
    schemaNames = ['public'],
    allowedSessionVariables,
  } = config;

  const { pathToTsConfig, sourceFile, importDeclaration } = graphqlTypes;

  const tableNames = await scanTables({
    databaseName,
    pathToHasuraDir,
    schemaNames,
  });

  const sourceTypesTsConfig = join(__dirname, '../../../tsconfig.lib.json');
  const sourceTypesProject = new Project({
    tsConfigFilePath: sourceTypesTsConfig,
  });

  const sourceTypesFile = sourceTypesProject.getSourceFileOrThrow(
    join(__dirname, 'types.ts')
  );
  const interfacesToCopy = sourceTypesFile.getInterfaces();

  const outputProject = new Project({
    tsConfigFilePath: pathToTsConfig,
  });

  const typesFile = outputProject.getSourceFileOrThrow(sourceFile);

  const destination = outputProject.createSourceFile(
    `${outputDir}/permissions.ts`,
    undefined,
    {
      overwrite: true,
    }
  );

  const sessionVariables = destination.addTypeAlias({
    isExported: true,
    name: 'SessionVariables',
    type: allowedSessionVariables
      ? allowedSessionVariables.map((sv) => `'${sv}'`).join(' | ')
      : 'string | number',
  });

  interfacesToCopy.forEach((i) => destination.addStatements(i.getFullText()));

  const tableTypes = tableNames.map(({ entityName, metadataFileName }) => {
    const tableTypeName = capitalize(entityName);
    const generateName = (...words: string[]) =>
      nameFromNamingConvention(namingConvention, tableTypeName, ...words);

    const boolExpType = typesFile
      .getTypeAliasOrThrow(generateName('Bool', 'Exp'))
      .getName();

    const columnsEnumType = typesFile
      .getTypeAliasOrThrow(generateName('Select', 'Column'))
      .getName();

    return {
      tableName: entityName,
      metadataFileName,
      tableTypeName,
      originalBoolExpType: boolExpType,
      boolExpType:
        namingConvention === 'graphql-default'
          ? `SnakeCasedPropertiesDeep<${boolExpType}>`
          : boolExpType,
      // TODO: support configuration between enum/type
      originalColumnsEnumType: columnsEnumType,
      columnsEnum:
        namingConvention === 'graphql-default'
          ? `SnakeCase<${columnsEnumType}>`
          : columnsEnumType,
    };
  });

  if (namingConvention === 'graphql-default') {
    destination
      .addImportDeclaration({
        moduleSpecifier: 'type-fest',
      })
      .addNamedImports(['SnakeCase', 'SnakeCasedPropertiesDeep']);
  }

  destination
    .addImportDeclaration({
      // TODO: Make this configurable
      moduleSpecifier: importDeclaration,
    })
    .addNamedImports(
      flatten(
        tableTypes.map((x) => [
          { name: x.originalBoolExpType },
          { name: x.originalColumnsEnumType },
        ])
      )
    );

  const validRolesType = destination.addTypeAlias({
    name: 'ValidRoles',
    type: roles.map((role) => `'${role}'`).join(' | '),
    isExported: true,
  });

  tableTypes.forEach((tableType) => {
    const { tableTypeName, boolExpType, columnsEnum, metadataFileName } =
      tableType;
    const generateName = (...words: string[]) =>
      nameFromNamingConvention(namingConvention, tableTypeName, ...words);

    destination.addTypeAlias({
      name: generateName('Insert', 'Permission'),
      type: `InsertPermission<${boolExpType}, ${columnsEnum}>`,
      isExported: true,
      docs: [
        `Insert permissions that can be applied to the ${tableTypeName} table`,
      ],
    });

    destination.addTypeAlias({
      name: generateName('Select', 'Permission'),
      type: `SelectPermission<${boolExpType}, ${columnsEnum}>`,
      isExported: true,
    });

    destination.addTypeAlias({
      name: generateName('Update', 'Permission'),
      type: `UpdatePermission<${boolExpType}, ${columnsEnum}, ${sessionVariables.getName()}>`,
      isExported: true,
    });

    destination.addTypeAlias({
      name: generateName('Delete', 'Permission'),
      type: `DeletePermission<${boolExpType}>`,
      isExported: true,
    });

    const entityPermissionsType = destination.addTypeAlias({
      name: generateName('Permissions'),
      type: `EntityPermissions<${validRolesType.getName()}, ${boolExpType}, ${columnsEnum}>`,
      isExported: true,
    });

    destination.addTypeAlias({
      name: generateName('Exportable', 'Permission'),
      type: `PermissionsExport<'${metadataFileName}', ${entityPermissionsType.getName()}>`,
      isExported: true,
    });
  });

  await outputProject.save();
};

type Columns = string[] | '*';

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
        columns: Columns;
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

export const writePermissions = (
  config: {
    pathToHasuraDir: string;
    databaseName: string;
  },
  permissions: WriteablePermissions
) => {
  // TODO Optimize this with a pool to write to files in parallel

  const { databaseName, pathToHasuraDir } = config;

  for (const { fileName, permissions: p } of permissions) {
    const tableYamlPath = `${pathToHasuraDir}/metadata/databases/${databaseName}/tables/${fileName}`;
    const tableYaml = readFileSync(tableYamlPath, 'utf8');
    const tableYamlJson = load(tableYaml) as Record<string, any>;

    tableYamlJson['insert_permissions'] = p.insert_permissions;
    tableYamlJson['select_permissions'] = p.select_permissions;
    tableYamlJson['update_permissions'] = p.update_permissions;
    tableYamlJson['delete_permissions'] = p.delete_permissions;

    const yamlString = dump(tableYamlJson);
    writeFileSync(tableYamlPath, yamlString, 'utf8');
  }
};
