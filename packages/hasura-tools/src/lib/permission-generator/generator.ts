import { PermissionGeneratorConfig } from './config';
import { Project } from 'ts-morph';
import { scanTables } from './metadata.utils';
import { capitalize, flatten } from 'lodash';
import { join } from 'path';

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

  const { pathToTsConfig, sourceFile } = graphqlTypes;

  const tableNames = await scanTables({
    databaseName,
    pathToHasuraDir,
    schemaNames,
  });

  const sourceTypesProject = new Project({
    tsConfigFilePath: join(__dirname, '../../../tsconfig.lib.json'),
  });

  const sourceTypesFile = sourceTypesProject.getSourceFileOrThrow('types.ts');
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

    return {
      tableName: entityName,
      metadataFileName,
      tableTypeName,
      boolExpType: typesFile.getTypeAliasOrThrow(generateName('Bool', 'Exp')),
      // TODO: support configuration between enum/type
      columnsEnum: typesFile.getTypeAliasOrThrow(
        generateName('Select', 'Column')
      ),
    };
  });

  destination
    .addImportDeclaration({
      // TODO: Make this configurable
      moduleSpecifier: `./${sourceFile.replace('.ts', '')}`,
    })
    .addNamedImports(
      flatten(
        tableTypes.map((x) => [
          { name: x.boolExpType.getName() },
          { name: x.columnsEnum.getName() },
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
      type: `InsertPermission<${boolExpType.getName()}, ${columnsEnum.getName()}>`,
      isExported: true,
      docs: [
        `Insert permissions that can be applied to the ${tableTypeName} table`,
      ],
    });

    destination.addTypeAlias({
      name: generateName('Select', 'Permission'),
      type: `SelectPermission<${boolExpType.getName()}, ${columnsEnum.getName()}>`,
      isExported: true,
    });

    destination.addTypeAlias({
      name: generateName('Update', 'Permission'),
      type: `UpdatePermission<${boolExpType.getName()}, ${columnsEnum.getName()}, ${sessionVariables.getName()}>`,
      isExported: true,
    });

    const entityPermissionsType = destination.addTypeAlias({
      name: generateName('Permissions'),
      type: `EntityPermissions<${validRolesType.getName()}, ${boolExpType.getName()}, ${columnsEnum.getName()}>`,
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

type WriteablePermissions = {
  fileName: string;
  permissions: {
    insert_permissions?: {
      check: Record<string, unknown>;
      columns: Columns;
      backend_only?: boolean;
      set?: Record<string, unknown>;
    }[];
    select_permissions?: {
      filter: Record<string, unknown>;
      columns: Columns;
      backend_only?: boolean;
      limit?: number;
      allow_aggregations?: boolean;
    };
    update_permissions?: {
      filter: Record<string, unknown>;
      check: Record<string, unknown>;
      columns: Columns;
      backend_only?: boolean;
      set?: Record<string, unknown>;
    };
  };
}[];

export const writePermissions = (permissions: WriteablePermissions) => {
  console.log(permissions);
};
