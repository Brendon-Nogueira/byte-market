import { CartItemModel } from "./cart-item-model";
import { ProductModel } from "../product/product-model";

export interface CartContextType {
  items: CartItemModel[];
  addToCart: (product: ProductModel) => void;
  decreaseQuantity: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isMounted: boolean;
  isDrawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
}
