import Link from "next/link";
import { Container } from "../Container/Container";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import { SearchInput } from "./SearchInput";
import { CartButton } from "./CartButton";
import { WishlistButton } from "./WishlistButton";
import { Suspense } from "react";
import { getCurrentUser, logoutAction } from "@/lib/auth-actions";
import { LogIn, LogOut, User } from "lucide-react";

export const Header = async () => {
  const user = await getCurrentUser();

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

            {/* Seção de Autenticação */}
            <div className="hidden sm:flex items-center gap-3 pl-2 border-l border-white/10">
              {user ? (
                <div className="flex items-center gap-3">
                  <Link href="/profile" className="flex flex-col text-right hover:opacity-80 transition-opacity">
                    <span className="text-xs text-muted">Olá,</span>
                    <span className="text-sm font-semibold text-secondary max-w-[120px] truncate hover:underline">
                      {user.name.split(" ")[0]}
                    </span>
                  </Link>
                  <form action={logoutAction}>
                    <button
                      type="submit"
                      title="Sair"
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-red-500/10 text-muted hover:text-red-400 border border-white/5 transition-all cursor-pointer active:scale-95"
                    >
                      <LogOut size={16} />
                    </button>
                  </form>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-secondary hover:bg-blue-600 text-white text-sm font-bold transition-all shadow-md shadow-blue-500/10 active:scale-95"
                >
                  <LogIn size={16} />
                  <span>Entrar</span>
                </Link>
              )}
            </div>

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
