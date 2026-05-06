export function BgLoader() {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="h-20 w-20 animate-spin rounded-full border-4 border-b-transparent border-primary"></div>
    </div>
  );
}
