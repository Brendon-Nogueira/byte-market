import { useContext } from "react";
import { CartContext } from "@/contexts/cart-context";

// hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
};
