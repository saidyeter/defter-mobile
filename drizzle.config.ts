import type { Config } from 'drizzle-kit';

export default {
  schema: './src/data/db-schema.ts',
  out: './src/data/drizzle',
  dialect: 'sqlite',
  driver: 'expo', // <--- very important
} satisfies Config;
