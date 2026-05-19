"use client";

import { useCart } from "@/hooks/use-cart";
import { ProductModel } from "@/models/product/product-model";
import { ShoppingCart } from "lucide-react";

interface AddToCartButtonProps {
  product: ProductModel;
}

export const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const { addToCart } = useCart();

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <button 
        onClick={() => addToCart(product)}
        className="flex-1 bg-secondary hover:bg-blue-600 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20 active:scale-95 group"
      >
        <ShoppingCart size={20} className="group-hover:rotate-12 transition-transform" />
        Adicionar ao Carrinho
      </button>
      <button className="flex-1 bg-foreground text-background font-bold py-4 rounded-2xl hover:opacity-90 transition-all active:scale-95">
        Comprar Agora
      </button>
    </div>
  );
};
