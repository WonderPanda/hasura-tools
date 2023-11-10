import { pascalCase, snakeCase } from './utils';

describe('utils', () => {
  describe('pascalCase', () => {
    it('should translate camel cased table names', () => {
      expect(pascalCase('my_table')).toEqual('MyTable');
    });
  });

  describe('snakeCase', () => {
    it('should translate to snake case', () => {
      expect(snakeCase('tenantId')).toEqual('tenant_id');
      expect(snakeCase('thisIsPascalCase')).toEqual('this_is_pascal_case');
    });
  });
});
