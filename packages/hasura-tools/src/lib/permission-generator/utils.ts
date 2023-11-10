import { NamingConvention } from './config';

export const pascalCase = (input: string) => {
  // Split the input string by spaces, underscores, or hyphens
  const words = input.split(/[\s_-]+/);

  // Capitalize the first letter of each word and join them
  const pascalCase = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

  return pascalCase;
};

export const pascalSnakeCase = (input: string) => {
  // Split the input string by spaces, underscores, or hyphens
  const words = input.split(/[\s_-]+/);

  // Capitalize the first letter of each word and join them
  const pascalCase = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('_');

  return pascalCase;
};

export const snakeCase = (input: string) => {
  return input
    .replace(/([A-Z])/g, '_$1')
    .toLowerCase()
    .replace(/^_/, '');
};

export type NonNullableArray<T> = T extends (infer U)[]
  ? U extends null | undefined
    ? never
    : U[]
  : never;

export const nameFromNamingConvention = (
  namingConvention: NamingConvention = 'graphql-default',
  ...words: string[]
) => {
  return namingConvention === 'graphql-default'
    ? words.join('')
    : words.join('_');
};
