import { SourceFile, SyntaxKind, TypeAliasDeclaration } from 'ts-morph';
import { NamingConvention } from './config';
import { ScannedTable } from './metadata.utils';
import { capitalize } from 'lodash';
import {
  NonNullableArray,
  nameFromNamingConvention,
  pascalCase,
  pascalSnakeCase,
} from './utils';

/**
 * Returns the columns names based on a Column Select type from Hasura codegen
 */
export const getSelectColumns = (selectColumnType: TypeAliasDeclaration) => {
  const selectColumns = selectColumnType
    .getDescendantsOfKind(SyntaxKind.StringLiteral)
    .map((t) => t.getText().replaceAll(`'`, '').replaceAll(`"`, ''));

  return selectColumns;
};

export const getTablesAndTypes = ({
  sourceFile,
  namingConvention,
  tables,
}: {
  sourceFile: SourceFile;
  namingConvention: NamingConvention;
  tables: ScannedTable[];
}) => {
  const maybeTableTypes = tables.map((table) => {
    const { entityName, metadataFileName } = table;
    try {
      const tableTypeName =
        namingConvention === 'hasura-default'
          ? pascalSnakeCase(entityName)
          : pascalCase(capitalize(entityName));

      const generateName = (...words: string[]) =>
        nameFromNamingConvention(namingConvention, tableTypeName, ...words);

      const boolExpType = sourceFile.getTypeAliasOrThrow(
        generateName('Bool', 'Exp')
      );

      const boolExpTypeName = boolExpType.getName();

      const columnsEnumType = sourceFile.getTypeAliasOrThrow(
        generateName('Select', 'Column')
      );

      const columns = getSelectColumns(columnsEnumType);

      const columnsEnumTypeName = columnsEnumType.getName();

      return {
        table,
        tableName: entityName,
        metadataFileName,
        tableTypeName,
        boolExpType,
        columnsEnumType,
        originalBoolExpTypeName: boolExpTypeName,
        boolExpTypeName:
          namingConvention === 'graphql-default'
            ? `SnakeCasedPropertiesDeep<${boolExpTypeName}>`
            : boolExpTypeName,
        // TODO: support configuration between enum/type
        originalColumnsEnumType: columnsEnumTypeName,
        columns,
        columnsEnum:
          namingConvention === 'graphql-default'
            ? `SnakeCase<${columnsEnumTypeName}>`
            : columnsEnumTypeName,
      };
    } catch (e) {
      // console.log(e);
      console.log(`Unable to process types for entity ${entityName}`);
      return null;
    }
  });

  const tableTypes = maybeTableTypes.filter(
    (x) => x !== null
  ) as unknown as NonNullableArray<typeof maybeTableTypes>;

  return tableTypes;
};
