const { z } = require('zod');
const { config } = require('dotenv');

config();

const hasuraEnvSchema = z.object({
  HASURA_GRAPHQL_API_ENDPOINT: z.string().url(),
  HASURA_GRAPHQL_ADMIN_SECRET: z.string().min(1),
});

module.exports = { HASURA_GRAPHQL_ADMIN_SECRET, HASURA_GRAPHQL_API_ENDPOINT } =
  hasuraEnvSchema.parse(process.env);
