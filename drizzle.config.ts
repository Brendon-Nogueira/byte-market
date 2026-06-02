import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv';


dotenv.config({ path: '.env' });

export default defineConfig({
  out: './src/db/drizzle/migrations',
  schema: './src/db/drizzle/schemas/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
