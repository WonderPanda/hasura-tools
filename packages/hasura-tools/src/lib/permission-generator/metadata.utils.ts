import { PermissionGeneratorConfig } from './config';
import { join } from 'path';
import globby from 'globby';
import { load } from 'js-yaml';
import { readFileSync } from 'fs';

export const buildSchemaRegex = (schemas: string[]) => {
  const regexString = schemas.join('|');
  return new RegExp(`^(${regexString})_`);
};

export type ScannedTable = {
  entityName: string;
  metadataFileName: string;
  contents: Record<string, unknown>;
};

export const scanTables = async ({
  databaseName,
  schemaNames,
  pathToHasuraDir,
}: Pick<PermissionGeneratorConfig, 'databaseName' | 'pathToHasuraDir'> & {
  schemaNames: string[];
}): Promise<ScannedTable[]> => {
  const metadataPath = join(
    pathToHasuraDir,
    `metadata/databases/${databaseName}/tables`
  );

  const globPatterns = schemaNames.map((s) => `${s}_*.yaml`);

  const files = await globby([...globPatterns, '!tables.yaml'], {
    cwd: metadataPath,
  });

  const regex = buildSchemaRegex(schemaNames);
  return files.map((f) => {
    // Non public schemas have the schema name automatically added as a prefix
    const schemaName = schemaNames.find((s) => f.startsWith(`${s}_`))!;
    const entityName = (
      schemaName === 'public' ? f.replace(regex, '') : f
    ).replace('.yaml', '');

    return {
      entityName,
      metadataFileName: f,
      contents: load(readFileSync(join(metadataPath, f), 'utf-8')) as Record<
        string,
        unknown
      >,
    };
  });
};
