import { BgLoader } from "@/components/BgLoader/BgLoader";
import { Container } from "@/components/Container/Container";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { productRepository } from "@/repositories/product/json-product-repository";
import { Suspense } from "react";
import { Hero } from "@/components/Hero/Hero";

export default async function Home() {
  const products = await productRepository.getAll();

  return (
    <>
      <Hero />
      <Container className="py-12">
      <h4 className="text-3xl font-heading font-bold text-foreground mb-10 text-center md:text-left">
        Nossos Produtos
      </h4>

      <Suspense fallback={<BgLoader />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Suspense>
      </Container>
    </>
  );
}
