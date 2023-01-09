import { PermissionGeneratorConfig } from './config';
import { join } from 'path';
import globby from 'globby';

export const buildSchemaRegex = (schemas: string[]) => {
  const regexString = schemas.join('|');
  return new RegExp(`^(${regexString})_`);
};

export const scanTables = async ({
  databaseName,
  schemaNames,
  pathToHasuraDir,
}: Pick<PermissionGeneratorConfig, 'databaseName' | 'pathToHasuraDir'> & {
  schemaNames: string[];
}): Promise<{ entityName: string; metadataFileName: string }[]> => {
  const metadataPath = join(
    pathToHasuraDir,
    `metadata/databases/${databaseName}/tables`
  );

  const globPatterns = schemaNames.map((s) => `${s}_*.yaml`);

  const files = await globby([...globPatterns, '!tables.yaml'], {
    cwd: metadataPath,
  });

  const regex = buildSchemaRegex(schemaNames);
  return files.map((f) => ({
    entityName: f.replace(regex, '').replace('.yaml', ''),
    metadataFileName: f,
  }));
};
