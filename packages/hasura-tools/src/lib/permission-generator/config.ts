export type PermissionGeneratorConfig = {
  /** The absolute path of the standard Hasura config. It should contain metadata, seeds etc */
  pathToHasuraDir: string;

  /** The name of the database for which tables will be scanned in order to generate the permission lib */
  databaseName: string;

  /** The names of schemas that should have permissions generated for their tables
   * Defaults to ['public']
   */
  schemaNames?: string[];

  /** The naming convention used for your Hasura instance. This will influence whether your types are PascalCase or Snake_Case
   * Defaults to 'graphql-default'
   */
  namingConvention?: 'graphql-default' | 'hasura-default';

  /** The Hasura roles that you wish to generate permissions for */
  roles: string[];

  /** Optional configuration that limits the values used when setting column presets.
   *
   * Configuring this will give intellisense when using the 'set' option on Insert or Update permissions.
   *
   * If not provided, any string | number | boolean will be allowed
   */
  allowedSessionVariables?: (string | number | boolean)[];

  graphqlTypes: {
    /** The path to a valid TsConfig file that is associated to your codegen GraphQL type definitions */
    pathToTsConfig: string;

    /**
     * The name of the typescript file that contains the generated GraphQL types for your Hasura instance
     */
    sourceFile: string;

    /** The logical import statement that should be used to access the graphql-types from the generated permissions lib
     *  If the permissions lib outputDir is going to be adjacent to the graphql-types file, a relative path can be used.
     *  Inside a monorepo, this might be the path to your graphql-types package eg. @my-org/graphql-types
     */
    importDeclaration: string;
  };

  /** The absolute path for where the generated files should be placed */
  outputDir: string;
};
