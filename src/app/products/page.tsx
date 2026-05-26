import { Container } from "@/components/Container/Container";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { productRepository } from "@/repositories/product/json-product-repository";
import { Suspense } from "react";
import { BgLoader } from "@/components/BgLoader/BgLoader";

import { SortSelector } from "@/components/ProductFilters/SortSelector";
import { FilterSidebar } from "@/components/ProductFilters/FilterSidebar";
import { ProductFilterOptions } from "@/models/product/product-filter-model";

interface ProductsPageProps {
  searchParams: Promise<ProductFilterOptions>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const options = await searchParams;
  const products = await productRepository.getAll(options);
  const brands = await productRepository.getBrands();
  const categories = await productRepository.getCategories();

  // Deriva o valor máximo do produto para o slider
  const allProducts = await productRepository.getAll();
  const maxProductPrice = Math.ceil(
    Math.max(...allProducts.map((p) => p.price), 0) / 100
  ) * 100;

  const hasFilters =
    options.brand || options.category || options.minPrice || options.maxPrice;

  return (
    <Container className="py-12">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
            Todos os produtos
          </h1>
          <p className="text-muted">
            Explore nosso catálogo completo de tecnologia de alta performance.
          </p>
        </div>

        <SortSelector />
      </div>

      {/* Body: sidebar + grid */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <FilterSidebar
          brands={brands}
          categories={categories}
          maxProductPrice={maxProductPrice}
        />

        <div className="flex-1 min-w-0">
          {/* Contagem de resultados */}
          <p className="text-sm text-muted mb-6">
            <span className="font-semibold text-foreground">{products.length}</span>{" "}
            {products.length === 1 ? "produto encontrado" : "produtos encontrados"}
            {hasFilters && (
              <span className="ml-1 text-secondary font-medium">· filtros ativos</span>
            )}
          </p>

          <Suspense fallback={<BgLoader />}>
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              /* Empty state */
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-secondary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                  Nenhum produto encontrado
                </h3>
                <p className="text-sm text-muted max-w-xs">
                  Tente ajustar ou remover os filtros para ver mais resultados.
                </p>
              </div>
            )}
          </Suspense>
        </div>
      </div>
    </Container>
  );
}
