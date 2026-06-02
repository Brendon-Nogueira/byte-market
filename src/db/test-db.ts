import { db } from './index';
import { products } from './drizzle/schemas/schema';

async function testConnection() {
  console.log('Tentando conectar ao banco de dados Neon...');
  try {
        const allProducts = await db.select().from(products).limit(5);
    console.log('Conexão estabelecida com sucesso!');
    console.log('Produtos encontrados:', allProducts);
  } catch (error) {
    console.error('Erro ao testar a conexão com o banco:', error);
  }
}

testConnection();
