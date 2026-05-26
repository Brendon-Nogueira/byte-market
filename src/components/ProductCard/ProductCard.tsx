"use client";

import { ProductModel } from "@/models/product/product-model";
import Link from "next/link";
import { useState } from "react";
import { AddToCartButton } from "../AddToCartButton/AddToCartButton";
import { useWishlist } from "@/contexts/wishlist-context";
import { Heart } from "lucide-react";


interface ProductCardProps {
  product: ProductModel;
}

export function ProductCard({ product }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const { has, toggle } = useWishlist();
  const isFavorite = has(product.id);

  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(product.price);

  const fallbackImage = `https://picsum.photos/800/800`;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-card border border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 glass">
      {/* Imagem do Produto */}
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <img
          src={imageError ? fallbackImage : product.image}
          alt={product.name}
          onError={() => setImageError(true)}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
        />
        {/* Botão de Favorito (Heart) */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggle(product);
          }}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white hover:text-red-500 backdrop-blur-md transition-all duration-300 active:scale-90"
          title={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          <Heart
            size={18}
            className={`transition-all duration-300 ${
              isFavorite ? "fill-red-500 text-red-500 scale-110" : ""
            }`}
          />
        </button>

        {/* Badge de Categoria */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center rounded-full bg-primary/80 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-md">
            {product.category}
          </span>
        </div>
      </div>

      {/* Informações do Produto */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-col gap-1">
          <p className="text-muted text-xs font-semibold uppercase tracking-wider">
            {product.brand}
          </p>
          <h3 className="text-lg font-heading font-bold text-foreground group-hover:text-secondary transition-colors line-clamp-1">
            <Link href={`/product/${product.slug}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-muted line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Preço e Ação */}
        <div className="mt-auto pt-5 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-foreground">
              {formattedPrice}
            </span>
            {Number(product.storage) > 0 || product.stock > 0 ? (
              <span className="text-[10px] text-accent font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Em estoque
              </span>
            ) : (
              <span className="text-[10px] text-red-500 font-medium">
                Fora de estoque
              </span>
            )}
          </div>

          <AddToCartButton product={product} variant="icon" />
        </div>
      </div>
    </div>
  );
}
