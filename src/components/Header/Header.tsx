import Link from "next/link";
import { Container } from "../Container/Container";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full glass shadow-sm">
      <Container>
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-2xl font-heading font-bold text-foreground tracking-tight"
            >
              Byte<span className="text-secondary">Market</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted">
              <Link
                href="/products"
                className="hover:text-secondary transition-colors"
              >
                Produtos
              </Link>
              <Link
                href="/categories"
                className="hover:text-secondary transition-colors"
              >
                Categorias
              </Link>
              <Link
                href="/offers"
                className="hover:text-secondary transition-colors"
              >
                Ofertas
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center px-4 py-2 rounded-full bg-background border border-border-glass text-sm text-muted focus-within:ring-2 focus-within:ring-secondary transition-all">
              <input
                type="text"
                placeholder="Buscar produtos..."
                className="bg-transparent border-none outline-none w-40 lg:w-60"
              />
            </div>

            <ThemeToggle />

            <button className="p-2 rounded-full hover:bg-white/10 transition-colors relative">
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
              <span className="absolute top-0 right-0 bg-secondary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                0
              </span>
            </button>

            <button className="md:hidden p-2">
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
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
};
