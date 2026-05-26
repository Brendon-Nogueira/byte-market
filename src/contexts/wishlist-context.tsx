"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { ProductModel } from "@/models/product/product-model";
import { useToast } from "@/hooks/use-toast";

export interface WishlistContextType {
  items: ProductModel[];
  add: (product: ProductModel) => void;
  remove: (productId: number) => void;
  has: (productId: number) => boolean;
  toggle: (product: ProductModel) => void;
  isMounted: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<ProductModel[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();

  // Carrega a lista de desejos do localStorage no momento da montagem
  useEffect(() => {
    const loadWishlist = () => {
      const savedWishlist = localStorage.getItem("byte-market-wishlist");
      if (savedWishlist) {
        try {
          setItems(JSON.parse(savedWishlist));
        } catch (e) {
          console.error("Error loading wishlist from localStorage", e);
        }
      }
      setIsMounted(true);
    };
    Promise.resolve().then(loadWishlist);
  }, []);

  // Salva a lista de desejos no localStorage
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("byte-market-wishlist", JSON.stringify(items));
    }
  }, [items, isMounted]);

  const add = (product: ProductModel) => {
    setItems((prev) => {
      if (prev.find((p) => p.id === product.id)) return prev;
      return [...prev, product];
    });
    toast(`"${product.name}" adicionado aos favoritos`, "success");
  };

  const remove = (productId: number) => {
    const itemToRemove = items.find((p) => p.id === productId);
    setItems((prev) => prev.filter((p) => p.id !== productId));
    if (itemToRemove) {
      toast(`"${itemToRemove.name}" removido dos favoritos`, "info");
    }
  };

  const has = (productId: number) => items.some((p) => p.id === productId);

  const toggle = (product: ProductModel) => {
    if (has(product.id)) {
      remove(product.id);
    } else {
      add(product);
    }
  };

  return (
    <WishlistContext.Provider value={{ items, add, remove, has, toggle, isMounted }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist deve ser usado no componente WishlistProvider");
  }
  return context;
};
