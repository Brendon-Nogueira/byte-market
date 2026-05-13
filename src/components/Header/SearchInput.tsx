"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="hidden sm:flex items-center px-4 py-2 rounded-full bg-background border border-border-glass text-sm text-muted focus-within:ring-2 focus-within:ring-secondary transition-all"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar produtos..."
        className="bg-transparent border-none outline-none w-40 lg:w-60 text-foreground"
      />
      <button type="submit" className="hover:text-secondary transition-colors">
        <Search size={18} />
      </button>
    </form>
  );
};
