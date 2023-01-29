import {
  generatePermissionsLibrary,
  nameFromNamingConvention,
  WriteablePermissions,
  writePermissions,
} from './generator';
import { join } from 'path';
import { cwd } from 'process';
import { OrganizationsExportablePermission } from '../../fixture/permissions';
import { readFileSync, unlinkSync, writeFileSync } from 'fs';
import { dump, load } from 'js-yaml';

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

  it('generates a file containing permission types', async () => {
    const currentDir = cwd();
    const pathToGraphQLTypesLib = join(currentDir, 'packages/graphql-types');
    const outputDir = join(pathToGraphQLTypesLib, 'src/lib');
    const outputFile = join(outputDir, 'permissions.ts');

    // Delete the file and make sure it doesn't exist
    try {
      unlinkSync(outputFile);
      // eslint-disable-next-line no-empty
    } catch {}

    expect(() => readFileSync(outputFile, 'utf8')).toThrow();

    await generatePermissionsLibrary({
      databaseName: 'default',
      outputDir,
      graphqlTypes: {
        pathToTsConfig: join(pathToGraphQLTypesLib, 'tsconfig.lib.json'),
        sourceFile: 'types.ts',
        importDeclaration: '@pandaverse/graphql-types',
      },
      roles: ['user', 'org-admin'],
      allowedSessionVariables: ['now()', 'X-Hasura-Org-Id', 'X-Hasura-User-Id'],
      pathToHasuraDir: join(currentDir, 'hasura'),
    });

    const generatedFile = readFileSync(outputFile, 'utf8');
    expect(generatedFile).toMatchSnapshot();
  });

  it('writes permissions to the correct metadata files', async () => {
    // In order to test this we'll remove the existing permissions and write
    // a new one to the metadata file, then we'll read the file and make sure
    // that the permissions have been applied correctly

    const sourceFilePath = join(
      cwd(),
      'hasura/metadata/databases/default/tables/public_organizations.yaml'
    );

    const readFileToJson = () => {
      const tableYaml = readFileSync(sourceFilePath, 'utf8');
      const tableYamlJson = load(tableYaml) as Record<string, any>;
      return tableYamlJson;
    };

    const tableYamlJson = readFileToJson();
    tableYamlJson.insert_permissions = [];
    tableYamlJson.select_permissions = [];
    tableYamlJson.update_permissions = [];
    tableYamlJson.delete_permissions = [];
    writeFileSync(sourceFilePath, dump(tableYamlJson));

    const tableYamlJsonAfterDelete = readFileToJson();

    expect(tableYamlJsonAfterDelete).not.toContain('insert_permissions');
    expect(tableYamlJsonAfterDelete).not.toContain('select_permissions');
    expect(tableYamlJsonAfterDelete).not.toContain('update_permissions');
    expect(tableYamlJsonAfterDelete).not.toContain('delete_permissions');

    const permission: OrganizationsExportablePermission = {
      fileName: 'public_organizations.yaml',
      permissions: {
        insert_permissions: [
          {
            role: 'user',
            permission: {
              check: {
                id: {
                  _eq: 'X-Hasura-Org-Id',
                },
              },
              columns: ['name', 'updated_at'],
              backend_only: false,
              set: {
                created_at: 'now()',
              },
            },
          },
        ],
        select_permissions: [
          {
            role: 'user',
            permission: {
              allow_aggregations: true,
              columns: '*',
              filter: {
                id: {
                  _eq: 'X-Hasura-Org-Id',
                },
              },
            },
          },
        ],
        update_permissions: [
          {
            role: 'user',
            permission: {
              columns: ['name'],
              filter: {
                id: {
                  _eq: 'X-Hasura-Org-Id',
                },
              },
            },
          },
        ],
        delete_permissions: [
          {
            role: 'user',
            permission: {
              backend_only: true,
              filter: {
                memberships: {
                  user_id: {
                    _eq: 'X-Hasura-User-Id',
                  },
                },
              },
            },
          },
        ],
      },
    };

    const permissions: WriteablePermissions = [permission];

    writePermissions(
      { databaseName: 'default', pathToHasuraDir: join(cwd(), 'hasura') },
      permissions
    );

    const tableYamlJsonAfterWrite = readFileToJson();
    expect(tableYamlJsonAfterWrite).toHaveProperty('insert_permissions');
    expect(tableYamlJsonAfterWrite.insert_permissions).toEqual(
      permission.permissions.insert_permissions
    );

    expect(tableYamlJsonAfterWrite).toHaveProperty('select_permissions');
    expect(tableYamlJsonAfterWrite.select_permissions).toEqual(
      permission.permissions.select_permissions
    );

    expect(tableYamlJsonAfterWrite).toHaveProperty('update_permissions');
    expect(tableYamlJsonAfterWrite.update_permissions).toEqual(
      permission.permissions.update_permissions
    );

    expect(tableYamlJsonAfterWrite).toHaveProperty('delete_permissions');
    expect(tableYamlJsonAfterWrite.delete_permissions).toEqual(
      permission.permissions.delete_permissions
    );
  });

  it.todo('can be successfully applied against a running Hasura instance');
});
