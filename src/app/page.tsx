import { Container } from "@/components/Container/Container";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { productRepository } from "@/repositories/product/json-product-repository";
import { Suspense } from "react";
import { Hero } from "@/components/Hero/Hero";
import { StatsBar } from "@/components/StatsBar/StatsBar";
import { CategorySection } from "@/components/CategorySection/CategorySection";
import { ProductGridSkeleton } from "@/components/ProductCardSkeleton/ProductCardSkeleton";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function Home() {
  const allProducts = await productRepository.getAll();
  const featuredProducts = allProducts.slice(0, 8);

  return (
    <>
      <Hero />

      {/* Faixa de confiança */}
      <StatsBar />

      {/* Navegação por categorias */}
      <CategorySection />

      <Container className="py-16">
        {/* Cabeçalho da seção com CTA inline */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-heading font-bold text-foreground">
              Produtos em Destaque
            </h2>
            <p className="text-muted mt-1 text-sm">
              Selecionados com a melhor curadoria tecnológica do mercado
            </p>
          </div>
          <Link
            href="/products"
            className="flex items-center gap-1.5 text-secondary font-semibold text-sm hover:underline underline-offset-4 group shrink-0"
          >
            Ver todos
            <ArrowRight
              size={15}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        {/* Grid de produtos com skeleton */}
        <Suspense fallback={<ProductGridSkeleton count={8} />}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Suspense>

        {/* CTA final centralizado */}
        <div className="mt-14 flex justify-center">
          <Link
            href="/products"
            className="px-10 py-4 bg-secondary hover:bg-blue-600 text-white font-bold rounded-2xl transition-all duration-300 flex items-center gap-2 shadow-lg shadow-blue-500/25 group active:scale-95"
          >
            Explorar todos os produtos
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </Container>
    </>
  );
}
