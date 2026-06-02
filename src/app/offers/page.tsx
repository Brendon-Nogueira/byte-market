import { Container } from "@/components/Container/Container";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { productRepository } from "@/repositories/product";
import { Suspense } from "react";
import { BgLoader } from "@/components/BgLoader/BgLoader";
import { Flame } from "lucide-react";

export default async function OffersPage() {
  const products = await productRepository.getOffers();

  return (
    <Container className="py-12">
      <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-orange-500 font-bold uppercase tracking-widest text-sm">
            <Flame size={18} fill="currentColor" />
            <span>Ofertas Relâmpago</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
            Melhores Ofertas
          </h1>
          <p className="text-muted">
            Produtos selecionados com preços imperdíveis por tempo limitado.
          </p>
        </div>
        
        <div className="px-6 py-3 bg-orange-500/10 border border-orange-500/20 rounded-2xl text-orange-500 font-bold text-sm">
          Até 40% de desconto
        </div>
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
            <h3 className="text-xl font-bold text-muted mb-2">Sem ofertas no momento</h3>
            <p className="text-muted">Fique de olho! Novas promoções surgem a qualquer instante.</p>
          </div>
        )}
      </Suspense>
    </Container>
  );
}
