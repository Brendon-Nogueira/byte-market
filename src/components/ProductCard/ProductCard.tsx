"use client";

import { ProductModel } from "@/models/product/product-model";
import Link from "next/link";
import { useState } from "react";

interface ProductCardProps {
  product: ProductModel;
}

export function ProductCard({ product }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);

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
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
            {product.brand}
          </p>
          <h3 className="text-lg font-heading font-bold text-slate-200 group-hover:text-secondary transition-colors line-clamp-1">
            <Link href={`/produto/${product.slug}`}>
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
            <span className="text-2xl font-bold text-slate-200">
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

          <button className="z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow-md hover:bg-secondary transition-colors duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
