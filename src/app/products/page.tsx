import { Container } from "@/components/Container/Container";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { productRepository } from "@/repositories/product/json-product-repository";
import { Suspense } from "react";
import { BgLoader } from "@/components/BgLoader/BgLoader";

import { SortSelector } from "@/components/ProductFilters/SortSelector";
import { BrandFilter } from "@/components/ProductFilters/BrandFilter";
import { ProductFilterOptions } from "@/models/product/product-filter-model";

interface ProductsPageProps {
  searchParams: Promise<ProductFilterOptions>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const options = await searchParams;
  const products = await productRepository.getAll(options);
  const brands = await productRepository.getBrands();

  return (
    <Container className="py-12">
      <div className="mb-10 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
              Todos os produtos
            </h1>
            <p className="text-muted">
              Explore nosso catálogo completo de tecnologia de alta performance.
            </p>
          </div>
          
          <SortSelector />
        </div>

        <div className="pt-6 border-t border-white/10">
          <p className="text-sm font-medium text-muted mb-4">Filtrar por marca:</p>
          <BrandFilter brands={brands} />
        </div>
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
