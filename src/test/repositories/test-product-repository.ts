import { productRepository } from "@/repositories/product/json-product-repository";

async function test() {
  console.log("Iniciando teste do repositório...");

  try {
    // 1. Testar busca de todos os produtos
    const allProducts = await productRepository.getAll();
    console.log(`Total de produtos encontrados: ${allProducts.length}`);

    if (allProducts.length > 0) {
      console.log("Primeiro produto:", allProducts[0].name);
    }

    // 2. Testar busca por ID
    if (allProducts.length > 0) {
      const idToSearch = allProducts[0].id;
      const product = await productRepository.getById(idToSearch);
      if (product) {
        console.log(`Busca por ID (${idToSearch}) funcionando:`, product.name);
      } else {
        console.log(`Busca por ID (${idToSearch}): Produto não encontrado.`);
      }
    }
  } catch (error) {
    console.error("Erro no teste:", error);
  }
}

test();
