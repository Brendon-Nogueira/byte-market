import { Container } from "@/components/Container/Container";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { productRepository } from "@/repositories/product/json-product-repository";
import { Suspense } from "react";
import { BgLoader } from "@/components/BgLoader/BgLoader";

export default async function ProductsPage() {
  const products = await productRepository.getAll();

  return (
    <Container className="py-12">
      <div className="mb-10 space-y-2 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
          Todos os produtos
        </h1>
        <p className="text-muted">
          Explore nosso catálogo completo de tecnologia de alta performance.
        </p>
      </div>

      <Suspense fallback={<BgLoader />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Suspense>
    </Container>
  );
}
