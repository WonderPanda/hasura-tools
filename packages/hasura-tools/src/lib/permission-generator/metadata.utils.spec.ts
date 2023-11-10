import { scanTables, buildSchemaRegex } from './metadata.utils';
import { cwd } from 'process';
import { join } from 'path';

describe('scan tables', () => {
  it('retrieves the list of relevant tables for the specified metadata config', async () => {
    await expect(
      scanTables({
        databaseName: 'default',
        pathToHasuraDir: join(cwd(), 'hasura'),
        schemaNames: ['public'],
      })
    ).resolves.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          entityName: 'memberships',
          metadataFileName: 'public_memberships.yaml',
        }),
        expect.objectContaining({
          entityName: 'organizations',
          metadataFileName: 'public_organizations.yaml',
        }),
        expect.objectContaining({
          entityName: 'posts',
          metadataFileName: 'public_posts.yaml',
        }),
        expect.objectContaining({
          entityName: 'users',
          metadataFileName: 'public_users.yaml',
        }),
      ])
    );
  });

  it('builds the correct regex for schema names', async () => {
    const regex = buildSchemaRegex(['public', 'another']);
    expect('public_users'.replace(regex, '')).toBe('users');
    expect('another_users'.replace(regex, '')).toBe('users');
    expect('third_users'.replace(regex, '')).toBe('third_users');
    expect('something_public_users'.replace(regex, '')).toBe(
      'something_public_users'
    );
  });
});
