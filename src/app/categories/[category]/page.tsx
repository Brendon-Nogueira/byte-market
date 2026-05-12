import { Container } from "@/components/Container/Container";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { productRepository } from "@/repositories/product/json-product-repository";
import { Suspense } from "react";
import { BgLoader } from "@/components/BgLoader/BgLoader";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  const products = await productRepository.getByCategory(category);

  return (
    <Container className="py-12">
      <div className="mb-10 space-y-2 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground capitalize">
          {categoryName}
        </h1>
        <p className="text-muted">
          Mostrando {products.length}{" "}
          {products.length === 1 ? "produto" : "produtos"} encontrados nesta
          categoria
        </p>
      </div>

      <Suspense fallback={<BgLoader />}>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h3 className="text-xl font-bold text-muted mb-2">
              Nenhum produto encontrado
            </h3>
            <p className="text-muted">
              Desculpe, ainda não temos itens cadastrados nesta categoria.
            </p>
          </div>
        )}
      </Suspense>
    </Container>
  );
}
