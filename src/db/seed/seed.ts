import { db } from '../index';
import { products as productsTable } from '../drizzle/schemas/schema';
import { JsonProductRepository } from '@/repositories/product/json-product-repository';

async function seed() {
  console.log('Inicializando o seed...');
  try {
    const jsonProductRepository = new JsonProductRepository();
    const localProducts = await jsonProductRepository.getAll();
    
    console.log(`Encontrados ${localProducts.length} produtos no arquivo JSON.`);

    console.log('Limpando registros existentes na tabela "products"...');
    await db.delete(productsTable);

    console.log('Inserindo produtos no banco de dados...');
    
    // Mapeia os dados do JSON 
    const productsToInsert = localProducts.map((p) => ({
      name: p.name,
      brand: p.brand,
      price: String(p.price),
      description: p.description,
      image: p.image,
      storage: p.storage,
      stock: p.stock,
      category: p.category,
      slug: p.slug,
      color: p.color,
      releaseDate: p.releaseDate ? String(p.releaseDate) : null,
      isAvailable: p.isAvailable,
      rating: p.rating,
      reviewCount: p.reviewCount,
      createdAt: p.created_at || new Date(),
      updatedAt: p.updated_at || new Date(),
    }));

    // Inserção em lote no banco Neon
    await db.insert(productsTable).values(productsToInsert);
    console.log('Seed realizado com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('Erro ao executar o seed:', error);
    process.exit(1);
  }
}

seed();