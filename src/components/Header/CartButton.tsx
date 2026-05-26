"use client";

import { useCart } from "@/hooks/use-cart";


export const CartButton = () => {
  const { totalItems, isMounted, setDrawerOpen } = useCart();

  return (
    <button 
      onClick={() => setDrawerOpen(true)}
      className="p-2 rounded-full hover:bg-white/10 transition-colors relative"
      aria-label="Ver Carrinho"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
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
      
      {/* Evita o efeito de "piscar" no carregamento */}
      {isMounted && totalItems > 0 && (
         <span className="absolute top-0 right-0 bg-secondary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-in zoom-in duration-300">
           {totalItems}
         </span>
       )}
    </button>
  );
};
