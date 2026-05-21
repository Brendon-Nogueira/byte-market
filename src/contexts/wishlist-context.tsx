"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { ProductModel } from "@/models/product/product-model";

export interface WishlistContextType {
  items: ProductModel[];
  add: (product: ProductModel) => void;
  remove: (productId: number) => void;
  has: (productId: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<ProductModel[]>([]);

  const add = (product: ProductModel) => {
    setItems((prev) => {
      if (prev.find((p) => p.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const remove = (productId: number) => {
    setItems((prev) => prev.filter((p) => p.id !== productId));
  };

  const has = (productId: number) => items.some((p) => p.id === productId);

  return (
    
    <WishlistContext.Provider value={{ items, add, remove, has }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
