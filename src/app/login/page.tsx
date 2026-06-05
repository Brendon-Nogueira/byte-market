"use client";

import { useTransition, useState } from "react";
import { loginAction } from "@/lib/auth-actions";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/Container/Container";
import { Eye, EyeOff, Loader2, LogIn } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // redireciona o usuario
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const response = await loginAction(formData);
      if (response?.success) {
        router.push(callbackUrl);
        router.refresh();
      } else {
        setError(response?.error || "E-mail ou senha inválidos.");
      }
    });
  };

  return (
    <Container className="py-20 flex justify-center items-center min-h-[80vh]">
      <div className="w-full max-w-md p-8 rounded-3xl bg-card border border-white/10 glass shadow-2xl relative overflow-hidden">
       
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col items-center mb-8 text-center relative z-10">
          <div className="p-4 rounded-2xl bg-secondary/10 text-secondary mb-4">
            <LogIn size={32} />
          </div>
          <h1 className="text-3xl font-heading font-bold text-foreground">
            Bem-vindo de Volta
          </h1>
          <p className="text-muted text-sm mt-1">
            Faça login para gerenciar seus produtos favoritos e compras.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center font-medium animate-shake">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-muted">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="seu@email.com"
              className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-secondary transition-all text-foreground text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-muted">
              Senha
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-secondary transition-all text-foreground text-sm pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-4 bg-secondary hover:bg-blue-600 text-white font-bold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed group active:scale-[0.98]"
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Entrando...
              </>
            ) : (
              "Entrar"
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center text-sm text-muted relative z-10">
          Ainda não tem uma conta?{" "}
          <Link
            href="/register"
            className="text-secondary hover:underline underline-offset-4 font-semibold"
          >
            Criar conta grátis
          </Link>
        </div>
      </div>
    </Container>
  );
}
