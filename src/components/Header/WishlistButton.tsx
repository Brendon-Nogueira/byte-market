"use client";

import { useWishlist } from "@/contexts/wishlist-context";
import { Heart } from "lucide-react";
import Link from "next/link";

export const WishlistButton = () => {
  const { items, isMounted } = useWishlist();
  const count = items.length;

  return (
    <Link
      href="/wishlist"
      className="p-2 rounded-full hover:bg-white/10 transition-colors relative block text-foreground hover:text-red-500"
      aria-label="Ver Favoritos"
    >
      <Heart size={24} className="transition-transform duration-300 active:scale-95" />
      
      {/* Evita o efeito de "piscar" no carregamento */}
      {isMounted && count > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-in zoom-in duration-300">
          {count}
        </span>
      )}
    </Link>
  );
};
