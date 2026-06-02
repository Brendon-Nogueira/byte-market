import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './drizzle/schemas/schema';
import dotenv from 'dotenv';

// Carrega variáveis do arquivo .env 
if (!process.env.DATABASE_URL) {
  dotenv.config();
}

export const connectionString = process.env.DATABASE_URL;


if (!connectionString) {
  throw new Error('DATABASE_URL variavel de ambiente não encontrada');
}
const sqlPath = neon(connectionString);
const sql = sqlPath
export const db = drizzle({
  client: sql,
  schema : {
    products: schema.products
  }, 
  //logger: true
});
