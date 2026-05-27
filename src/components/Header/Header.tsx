import Link from "next/link";
import { Container } from "../Container/Container";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import { SearchInput } from "./SearchInput";
import { CartButton } from "./CartButton";
import { WishlistButton } from "./WishlistButton";
import { Suspense } from "react";

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
            <Suspense fallback={null}>
              <SearchInput />
            </Suspense>

            <ThemeToggle />

            <WishlistButton />

            <CartButton />

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
