"use client";

import React, { useState, useEffect } from "react";
import { CartItemModel } from "../models/cart/cart-item-model";
import { ProductModel } from "../models/product/product-model";
import { CartContext } from "../contexts/cart-context";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItemModel[]>([]);

  // Carrega o carrinho do localStorage ao iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem("byte-market-cart");
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  // Salva no localStorage sempre que o carrinho mudar
  useEffect(() => {
    localStorage.setItem("byte-market-cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (product: ProductModel) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const decreaseQuantity = (productId: number) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === productId);

      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }

      // Se a quantidade for 1 ou menor, remove o item
      return prevItems.filter((item) => item.id !== productId);
    });
  };

  const removeFromCart = (productId: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
