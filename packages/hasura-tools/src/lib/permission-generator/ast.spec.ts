import { Project } from 'ts-morph';
import { join } from 'path';
import { getSelectColumns } from './ast';

describe('ast', () => {
  it('can extract column names from select column type', () => {
    const project = new Project({});

    const file = project.addSourceFileAtPath(
      join(__dirname, '../../fixture/SelectColumn.d.ts')
    );

    const selectColumns = getSelectColumns(
      file.getTypeAliasOrThrow('UsersSelectColumn')
    );

    expect(selectColumns).toEqual([
      'createdAt',
      'email',
      'firstName',
      'id',
      'lastName',
      'updatedAt',
    ]);
  });
});
