"use client";

import { Container } from "@/components/Container/Container";
import { useWishlist } from "@/contexts/wishlist-context";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function WishlistPage() {
  const { items, isMounted } = useWishlist();

  if (!isMounted) {
    return (
      <Container className="py-12">
        <div className="h-10 w-64 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse mb-10" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="aspect-[3/4] rounded-3xl bg-card border border-white/10 glass animate-pulse"
            />
          ))}
        </div>
      </Container>
    );
  }

  if (items.length === 0) {
    return (
      <Container className="py-20">
        <div className="flex flex-col items-center justify-center text-center space-y-6">
          <div className="p-6 rounded-full bg-muted/20 text-muted">
            <Heart size={64} className="stroke-1" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-heading font-bold">Sua lista de desejos está vazia</h1>
            <p className="text-muted max-w-md mx-auto">
              Você ainda não favoritou nenhum produto. Navegue pela loja e clique no ícone de coração nos seus produtos favoritos!
            </p>
          </div>
          <Link
            href="/products"
            className="px-8 py-3 bg-primary text-white rounded-full font-bold hover:bg-secondary transition-all"
          >
            Explorar Produtos
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-12">
      <div className="flex items-center gap-3 mb-10">
        <Heart className="text-red-500 fill-red-500" size={32} />
        <h1 className="text-4xl font-heading font-bold">Meus Favoritos</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Container>
  );
}
