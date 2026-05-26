export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-card border border-white/10 animate-pulse">
      {/* Imagem placeholder */}
      <div className="aspect-square bg-slate-200 dark:bg-slate-700/60" />

      {/* Conteúdo placeholder */}
      <div className="flex flex-col gap-3 p-5">
        {/* Brand */}
        <div className="h-2.5 w-1/4 rounded-full bg-slate-200 dark:bg-slate-700/60" />
        {/* Nome */}
        <div className="h-5 w-3/4 rounded-full bg-slate-200 dark:bg-slate-700/60" />
        {/* Descrição */}
        <div className="flex flex-col gap-1.5 mt-1">
          <div className="h-2.5 w-full rounded-full bg-slate-200 dark:bg-slate-700/60" />
          <div className="h-2.5 w-2/3 rounded-full bg-slate-200 dark:bg-slate-700/60" />
        </div>

        {/* Preço e botão */}
        <div className="mt-5 flex items-center justify-between">
          <div className="flex flex-col gap-1.5">
            <div className="h-7 w-24 rounded-full bg-slate-200 dark:bg-slate-700/60" />
            <div className="h-2 w-12 rounded-full bg-slate-200 dark:bg-slate-700/60" />
          </div>
          <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700/60" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
