"use client";

import React, { useEffect } from "react";
import { useCart } from "@/hooks/use-cart";
import { X, Plus, Minus, Trash2, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { ProductImage } from "../ProductImage/ProductImage";


export const CartDrawer = () => {
  const {
    items,
    isMounted,
    isDrawerOpen,
    setDrawerOpen,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  // previne o background scroller
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDrawerOpen]);

  if (!isMounted) return null;

  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(totalPrice);

  return (
    <>
      {/* Animação do Overlay / Backdrop */}
      <div
        data-test-id="cart-drawer"
        aria-hidden={!isDrawerOpen}
        className={`fixed top-0 right-0 … ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={() => setDrawerOpen(false)}
      />

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full sm:max-w-md bg-background/95 border-l border-white/10 shadow-2xl backdrop-blur-md transition-transform duration-300 ease-out flex flex-col ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart size={22} className="text-secondary" />
            <h2 className="text-xl font-heading font-bold text-foreground">
              Seu Carrinho
              {totalItems > 0 && (
                <span className="ml-2 text-xs font-normal text-muted bg-white/10 px-2 py-0.5 rounded-full">
                  {totalItems} {totalItems === 1 ? "item" : "itens"}
                </span>
              )}
            </h2>
          </div>
          <button
            onClick={() => setDrawerOpen(false)}
            aria-label="Fechar carrinho"
            className="p-2 rounded-full hover:bg-white/10 text-muted hover:text-foreground transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Lista de itens */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-muted animate-pulse">
                <ShoppingCart size={32} />
              </div>
              <h3 className="text-lg font-bold text-foreground">Carrinho vazio</h3>
              <p className="text-sm text-muted max-w-xs">
                Explore a nossa loja e adicione alguns produtos incríveis ao seu carrinho.
              </p>
              <button
                onClick={() => setDrawerOpen(false)}
                className="px-6 py-2.5 bg-primary hover:bg-primary/95 text-white font-medium rounded-xl transition-all shadow-md active:scale-95 text-sm"
              >
                Continuar Comprando
              </button>
            </div>
          ) : (
            items.map((item) => {
              const itemFormattedPrice = new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(item.price);

              return (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 rounded-2xl bg-card border border-white/5 hover:border-white/10 transition-all duration-300"
                >
                  {/* Imagem do produto */}
                  <div className="relative w-20 h-20 bg-slate-100 rounded-xl overflow-hidden shrink-0">
                    <ProductImage
                      src={item.image}
                      alt={item.name}
                      category={item.category}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Informações do Produto */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-foreground line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-xs text-muted mt-0.5">{item.brand}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Preço */}
                      <span className="text-sm font-semibold text-secondary">
                        {itemFormattedPrice}
                      </span>

                      {/* Seletor de quantidade */}
                      <div className="flex items-center gap-1 bg-slate-800 rounded-lg p-1 border border-white/5">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="p-1 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-xs font-semibold px-2 min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => addToCart(item)}
                          className="p-1 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Botão remover */}
                  <div className="flex items-start">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                      title="Remover item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-white/10 space-y-4 bg-card/50">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted">Subtotal</span>
              <span className="text-lg font-bold text-foreground">{formattedPrice}</span>
            </div>

            <div className="flex flex-col gap-2">
              <Link
                href="/cart"
                onClick={() => setDrawerOpen(false)}
                className="w-full py-3 bg-secondary hover:bg-secondary/95 text-white font-bold rounded-xl text-center shadow-lg transition-all active:scale-95 text-sm"
              >
                Ir para o Carrinho
              </Link>
              <button
                onClick={clearCart}
                className="w-full py-2.5 bg-transparent border border-white/10 hover:border-red-500/20 hover:bg-red-500/5 text-muted hover:text-red-500 font-semibold rounded-xl text-center transition-all text-xs"
              >
                Limpar Carrinho
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
