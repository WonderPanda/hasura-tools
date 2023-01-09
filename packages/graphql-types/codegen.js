const {
  HASURA_GRAPHQL_ADMIN_SECRET,
  HASURA_GRAPHQL_API_ENDPOINT,
} = require('../../tools/parse-hasura-env');

const codegenConfig = {
  generates: {
    'src/lib/types.ts': {
      schema: [
        {
          [HASURA_GRAPHQL_API_ENDPOINT]: {
            headers: {
              'x-hasura-admin-secret': HASURA_GRAPHQL_ADMIN_SECRET,
            },
          },
        },
      ],
      plugins: ['typescript'],
      config: {
        enumsAsTypes: true,
        scalars: {
          date: 'string',
          jsonb: 'unknown',
          timestamptz: 'string',
          timestamp: 'string',
          citext: 'string',
          numeric: 'number',
          bigint: 'string',
        },
      },
    },
  },
};

module.exports = codegenConfig;
