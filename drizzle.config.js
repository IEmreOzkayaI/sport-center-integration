import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './lib/drizzle/schema.ts',
  out: './lib/drizzle/generated',
  dialect: 'postgresql',
  dbCredentials: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false, // Disable SSL certificate verification
    },
  },
});
