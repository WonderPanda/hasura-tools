import {
  generatePermissionsLibrary,
  nameFromNamingConvention,
} from './generator';
import { join } from 'path';
import { cwd } from 'process';

describe('permissions generator', () => {
  it('converts names based on a naming convention', () => {
    const words = ['These', 'Words', 'For', 'Name'];
    expect(nameFromNamingConvention('graphql-default', ...words)).toEqual(
      'TheseWordsForName'
    );
    expect(nameFromNamingConvention('hasura-default', ...words)).toEqual(
      'These_Words_For_Name'
    );
  });

  it('generates a permissions lib', async () => {
    const currentDir = cwd();
    const pathToGraphQLTypesLib = join(currentDir, 'packages/graphql-types');

    await generatePermissionsLibrary({
      databaseName: 'default',
      outputDir: join(pathToGraphQLTypesLib, 'src/lib'),
      graphqlTypes: {
        pathToTsConfig: join(pathToGraphQLTypesLib, 'tsconfig.lib.json'),
        sourceFile: 'types.ts',
      },
      roles: ['user', 'org-admin'],
      allowedSessionVariables: [
        'now()',
        'X-Hasura-Org-Id',
        'X-Hasura-User-Id',
        42,
      ],
      pathToHasuraDir: join(currentDir, 'hasura'),
    });
  });
});
