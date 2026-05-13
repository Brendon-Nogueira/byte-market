import { createContext } from "react";
import { CartContextType } from "../models/cart/cart-context-model";
export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);
