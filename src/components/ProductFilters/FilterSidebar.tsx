"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

interface FilterSidebarProps {
  brands: string[];
  categories: string[];
  maxProductPrice: number;
}

export const FilterSidebar = ({
  brands,
  categories,
  maxProductPrice,
}: FilterSidebarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentBrand = searchParams.get("brand") || "";
  const currentCategory = searchParams.get("category") || "";
  const currentMin = Number(searchParams.get("minPrice") || 0);
  const currentMax = Number(searchParams.get("maxPrice") || maxProductPrice);

  const [priceMin, setPriceMin] = useState(currentMin);
  const [priceMax, setPriceMax] = useState(currentMax);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Sync state when URL changes (e.g. browser back/forward)
  useEffect(() => {
    setPriceMin(Number(searchParams.get("minPrice") || 0));
    setPriceMax(Number(searchParams.get("maxPrice") || maxProductPrice));
  }, [searchParams, maxProductPrice]);

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === null || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const applyPrice = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (priceMin > 0) params.set("minPrice", String(priceMin));
    else params.delete("minPrice");
    if (priceMax < maxProductPrice) params.set("maxPrice", String(priceMax));
    else params.delete("maxPrice");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const clearAll = () => {
    setPriceMin(0);
    setPriceMax(maxProductPrice);
    router.push("?", { scroll: false });
  };

  const hasActiveFilters =
    currentBrand || currentCategory || currentMin > 0 || currentMax < maxProductPrice;

  const SidebarContent = () => (
    <div className="space-y-7">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-heading font-bold text-foreground">Filtros</h2>
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="text-xs font-semibold text-secondary hover:text-secondary/80 transition-colors flex items-center gap-1"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Limpar
          </button>
        )}
      </div>

      {/* Categories */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-muted mb-3">
          Categoria
        </p>
        <ul className="space-y-1">
          <li>
            <button
              onClick={() => updateParam("category", null)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                !currentCategory
                  ? "bg-secondary/15 text-secondary border border-secondary/30"
                  : "text-muted hover:text-foreground hover:bg-white/5"
              }`}
            >
              Todas
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat}>
              <button
                onClick={() =>
                  updateParam("category", currentCategory === cat ? null : cat)
                }
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentCategory === cat
                    ? "bg-secondary/15 text-secondary border border-secondary/30"
                    : "text-muted hover:text-foreground hover:bg-white/5"
                }`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10" />

      {/* Brands */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-muted mb-3">
          Marca
        </p>
        <ul className="space-y-1">
          <li>
            <button
              onClick={() => updateParam("brand", null)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                !currentBrand
                  ? "bg-secondary/15 text-secondary border border-secondary/30"
                  : "text-muted hover:text-foreground hover:bg-white/5"
              }`}
            >
              Todas
            </button>
          </li>
          {brands.map((brand) => (
            <li key={brand}>
              <button
                onClick={() =>
                  updateParam("brand", currentBrand === brand ? null : brand)
                }
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentBrand === brand
                    ? "bg-secondary/15 text-secondary border border-secondary/30"
                    : "text-muted hover:text-foreground hover:bg-white/5"
                }`}
              >
                {brand}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10" />

      {/* Price Range */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-muted mb-4">
          Faixa de preço
        </p>
        <div className="space-y-4">
          {/* Display */}
          <div className="flex items-center justify-between text-sm font-semibold text-foreground">
            <span>
              {priceMin.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
                maximumFractionDigits: 0,
              })}
            </span>
            <span>
              {priceMax.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
                maximumFractionDigits: 0,
              })}
            </span>
          </div>

          {/* Min slider */}
          <div className="space-y-1">
            <label className="text-xs text-muted">Mínimo</label>
            <input
              id="price-min-slider"
              type="range"
              min={0}
              max={maxProductPrice}
              step={100}
              value={priceMin}
              onChange={(e) => {
                const v = Number(e.target.value);
                if (v <= priceMax) setPriceMin(v);
              }}
              className="w-full accent-secondary cursor-pointer"
            />
          </div>

          {/* Max slider */}
          <div className="space-y-1">
            <label className="text-xs text-muted">Máximo</label>
            <input
              id="price-max-slider"
              type="range"
              min={0}
              max={maxProductPrice}
              step={100}
              value={priceMax}
              onChange={(e) => {
                const v = Number(e.target.value);
                if (v >= priceMin) setPriceMax(v);
              }}
              className="w-full accent-secondary cursor-pointer"
            />
          </div>

          <button
            id="apply-price-filter-btn"
            onClick={applyPrice}
            className="w-full py-2 rounded-xl bg-secondary text-white text-xs font-bold hover:bg-secondary/90 transition-all active:scale-95"
          >
            Aplicar preço
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <div className="lg:hidden mb-4">
        <button
          id="filter-mobile-toggle"
          onClick={() => setMobileOpen((v) => !v)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-card text-sm font-semibold text-foreground hover:bg-white/5 transition-all"
        >
          <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
          </svg>
          Filtros
          {hasActiveFilters && (
            <span className="ml-1 px-1.5 py-0.5 rounded-full bg-secondary text-white text-[10px] font-bold">
              ●
            </span>
          )}
        </button>

        {/* Mobile dropdown panel */}
        {mobileOpen && (
          <div className="mt-3 p-5 rounded-2xl border border-white/10 bg-card shadow-xl">
            <SidebarContent />
          </div>
        )}
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-56 shrink-0">
        <div className="sticky top-24 p-5 rounded-2xl border border-white/10 bg-card">
          <SidebarContent />
        </div>
      </aside>
    </>
  );
};
