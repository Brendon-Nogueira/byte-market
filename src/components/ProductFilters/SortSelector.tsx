"use client";

import { useRouter, useSearchParams } from "next/navigation";

export const SortSelector = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort") || "";

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-muted whitespace-nowrap">
        Ordenar por:
      </span>
      <select
        value={currentSort}
        onChange={(e) => handleSortChange(e.target.value)}
        className="bg-card border border-white/10 rounded-xl px-4 py-2 text-sm text-foreground focus:ring-2 focus:ring-secondary outline-none transition-all cursor-pointer hover:bg-white/5"
      >
        <option value="">Destaque</option>
        <option value="price_asc">Menor preço</option>
        <option value="price_desc">Maior preço</option>
        <option value="name_asc">Nome (A-Z)</option>
        <option value="name_desc">Nome (Z-A)</option>
      </select>
    </div>
  );
};
