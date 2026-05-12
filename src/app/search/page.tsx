import { Container } from "@/components/Container/Container";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { productRepository } from "@/repositories/product/json-product-repository";
import { Suspense } from "react";
import { BgLoader } from "@/components/BgLoader/BgLoader";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  // Att Next 15, searchParams é uma Promise
  const { q: query } = await searchParams;

  const products = query ? await productRepository.search(query) : [];

  return (
    <Container className="py-12">
      <div className="mb-10 space-y-2 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
          {query
            ? `Resultados para: "${query}"`
            : "O que você está procurando?"}
        </h1>
        <p className="text-muted">
          {products.length > 0
            ? `Encontramos ${products.length} ${products.length === 1 ? "produto" : "produtos"} para você.`
            : query
              ? "Nenhum produto corresponde à sua busca."
              : "Digite algo na barra de busca acima."}
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
          query && (
            <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-white/5 rounded-3xl bg-white/2">
              <h3 className="text-xl font-bold text-muted mb-2">
                Ops! Não encontramos nada.
              </h3>
              <p className="text-muted max-w-md">
                Tente usar palavras-chave mais genéricas ou verifique se o nome
                do produto está correto.
              </p>
            </div>
          )
        )}
      </Suspense>
    </Container>
  );
}
