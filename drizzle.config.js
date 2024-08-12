import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './lib/drizzle/schema.ts',
  out: './lib/drizzle/generated',
});
