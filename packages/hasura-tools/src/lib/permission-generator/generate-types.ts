import { PermissionGeneratorConfig } from './config';
import { Project } from 'ts-morph';
import { scanTables } from './metadata.utils';
import { flatten } from 'lodash';
import { join } from 'path';
import { nameFromNamingConvention } from './utils';
import { getTablesAndTypes } from './ast';

export const generatePermissionsLibrary = async (
  config: PermissionGeneratorConfig
) => {
  const {
    databaseName,
    output: { outputDir, outputFileName = 'permission-types.ts' },
    graphqlTypes,
    pathToHasuraDir,
    roles,
    namingConvention = 'graphql-default',
    schemaNames = ['public'],
    allowedSessionVariables,
    tableFilter = () => true,
  } = config;

  const { pathToTsConfig, sourceFile, importDeclaration } = graphqlTypes;

  const tables = await scanTables({
    databaseName,
    pathToHasuraDir,
    schemaNames,
  });

  const sourceTypesProject = new Project({});

  const sourceTypesFile = sourceTypesProject.addSourceFileAtPath(
    join(__dirname, 'types.d.ts')
  );

  const interfacesToCopy = sourceTypesFile.getInterfaces();

  const outputProject = new Project({
    tsConfigFilePath: pathToTsConfig,
  });

  const typesFile = outputProject.getSourceFileOrThrow(sourceFile);

  const destination = outputProject.createSourceFile(
    `${outputDir}/${
      outputFileName.endsWith('.ts') ? outputFileName : `${outputFileName}.ts`
    }`,
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

  const tableTypes = getTablesAndTypes({
    sourceFile: typesFile,
    namingConvention,
    tables: tables.filter((t) => tableFilter(t.entityName)),
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
      moduleSpecifier: importDeclaration,
    })
    .addNamedImports(
      flatten(
        tableTypes.map((x) => [
          { name: x.originalBoolExpTypeName },
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
    const { tableTypeName, boolExpTypeName, columnsEnum, metadataFileName } =
      tableType;
    const generateName = (...words: string[]) =>
      nameFromNamingConvention(namingConvention, tableTypeName, ...words);

    destination.addTypeAlias({
      name: generateName('Insert', 'Permission'),
      type: `InsertPermission<${boolExpTypeName}, ${columnsEnum}>`,
      isExported: true,
      docs: [
        `Insert permissions that can be applied to the ${tableTypeName} table`,
      ],
    });

    const computedFields: { name: string }[] =
      (tableType.table.contents['computed_fields'] as unknown as {
        name: string;
      }[]) ?? [];

    const computedFieldsAlias = destination.addTypeAlias({
      name: generateName('Computed', 'Fields'),
      type: computedFields.map((c) => `'${c.name}'`).join(' | '),
    });

    destination.addTypeAlias({
      name: generateName('Select', 'Permission'),
      type: `SelectPermission<${boolExpTypeName}, ${columnsEnum}, ${computedFieldsAlias.getName()}>`,
      isExported: true,
    });

    destination.addTypeAlias({
      name: generateName('Update', 'Permission'),
      type: `UpdatePermission<${boolExpTypeName}, ${columnsEnum}, ${sessionVariables.getName()}>`,
      isExported: true,
    });

    destination.addTypeAlias({
      name: generateName('Delete', 'Permission'),
      type: `DeletePermission<${boolExpTypeName}>`,
      isExported: true,
    });

    const entityPermissionsType = destination.addTypeAlias({
      name: generateName('Permissions'),
      type: `EntityPermissions<${validRolesType.getName()}, ${boolExpTypeName}, ${columnsEnum}, ${computedFieldsAlias.getName()}>`,
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
