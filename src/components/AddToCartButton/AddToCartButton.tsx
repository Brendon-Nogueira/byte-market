"use client";

import { useCart } from "@/hooks/use-cart";
import { ProductModel } from "@/models/product/product-model";
import { ShoppingCart } from "lucide-react";

interface AddToCartButtonProps {
  product: ProductModel;
  variant?: "full" | "icon";
  className?: string;
}

export const AddToCartButton = ({ 
  product, 
  variant = "full", 
  className = "" 
}: AddToCartButtonProps) => {
  const { addToCart } = useCart();

  if (variant === "icon") {
    return (
      <button
        onClick={(e) => {
          e.preventDefault(); // Evita navegar para a página do produto ao clicar no ícone
          addToCart(product);
        }}
        className={`z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow-md hover:bg-secondary transition-all duration-300 active:scale-90 ${className}`}
      >
        <ShoppingCart size={18} />
      </button>
    );
  }

  return (
    <button
      onClick={() => addToCart(product)}
      className={`flex-1 bg-secondary hover:bg-blue-600 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20 active:scale-95 group ${className}`}
    >
      <ShoppingCart size={20} className="group-hover:rotate-12 transition-transform" />
      Adicionar ao Carrinho
    </button>
  );
};
