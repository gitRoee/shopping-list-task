import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/schemas/shoppingList.ts',
  out: './src/drizzle',
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? ""
  },
});