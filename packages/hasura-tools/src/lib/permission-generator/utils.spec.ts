import { pascalCase } from './utils';

describe('utils', () => {
  describe('pascalCase', () => {
    it('should translate camel cased table names', () => {
      expect(pascalCase('my_table')).toEqual('MyTable');
    });
  });
});
