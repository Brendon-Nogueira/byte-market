import dotenv from 'dotenv';
dotenv.config();

import { db } from './index';
import { migrate } from 'drizzle-orm/neon-http/migrator';

async function runMigrations() {
  console.log('Iniciando migrações no banco Neon...');
  try {
    
    // Aplica as migrações da pasta gerada pelo drizzle-kit
    await migrate(db, { migrationsFolder: './src/db/drizzle/migrations' });
    console.log('Migrações aplicadas com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('Erro ao executar as migrações:', error);
    process.exit(1);
  }
}

runMigrations();
