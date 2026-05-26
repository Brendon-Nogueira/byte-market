"use client";

import { useWishlist } from "@/contexts/wishlist-context";
import { ProductModel } from "@/models/product/product-model";
import { Heart } from "lucide-react";

interface ProductPageWishlistButtonProps {
  product: ProductModel;
}

export const ProductPageWishlistButton = ({ product }: ProductPageWishlistButtonProps) => {
  const { has, toggle, isMounted } = useWishlist();

  if (!isMounted) {
    return (
      <div className="h-[56px] w-[56px] bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse shrink-0" />
    );
  }

  const isFavorite = has(product.id);

  return (
    <button
      onClick={() => toggle(product)}
      className={`h-[56px] w-[56px] flex items-center justify-center rounded-2xl border transition-all duration-300 active:scale-95 shrink-0 shadow-lg ${
        isFavorite
          ? "bg-red-500/10 border-red-500/30 text-red-500 hover:bg-red-500/20"
          : "bg-white/5 border-white/10 hover:border-white/20 text-muted-foreground hover:text-foreground hover:bg-white/10"
      }`}
      aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      title={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
    >
      <Heart
        size={22}
        className={`transition-all duration-300 ${isFavorite ? "fill-red-500 scale-110" : ""}`}
      />
    </button>
  );
};
