"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface BrandFilterProps {
  brands: string[];
}

export const BrandFilter = ({ brands }: BrandFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentBrand = searchParams.get("brand") || "";

  const handleBrandClick = (brand: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (currentBrand === brand) {
      params.delete("brand");
    } else {
      params.set("brand", brand);
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => {
          const params = new URLSearchParams(searchParams.toString());
          params.delete("brand");
          router.push(`?${params.toString()}`, { scroll: false });
        }}
        className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
          !currentBrand
            ? "bg-secondary border-secondary text-white shadow-lg shadow-secondary/20"
            : "bg-transparent border-white/10 text-muted hover:border-white/20"
        }`}
      >
        Todas as marcas
      </button>

      {brands.map((brand) => (
        <button
          key={brand}
          onClick={() => handleBrandClick(brand)}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
            currentBrand === brand
              ? "bg-secondary border-secondary text-white shadow-lg shadow-secondary/20"
              : "bg-transparent border-white/10 text-muted hover:border-white/20"
          }`}
        >
          {brand}
        </button>
      ))}
    </div>
  );
};
