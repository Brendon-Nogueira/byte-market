import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

// mesma coisa do auth-actions removi o fallback harded coded
const JWT_SECRET = process.env.JWT_SECRET
  ? new TextEncoder().encode(process.env.JWT_SECRET)
  : null;

export async function proxy(request: NextRequest) {
  let isTokenValid = false;

  if (JWT_SECRET) {
    const token = request.cookies.get("session")?.value;
    if (token) {
      try {
        await jose.jwtVerify(token, JWT_SECRET);
        isTokenValid = true;
      } catch {
        isTokenValid = false;
      }
    }
  }

  const { pathname } = request.nextUrl;

  // exige autenticação 
  const isProtectedRoute =
    pathname.startsWith("/wishlist") ||
    pathname.startsWith("/cart") ||
    pathname.startsWith("/orders");

  
  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register");

  // Redireciona sem token válido
  if (isProtectedRoute && !isTokenValid) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Se já está logado, redireciona login/registro para a home
  if (isAuthPage && isTokenValid) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: ["/wishlist/:path*", "/cart/:path*", "/orders/:path*", "/login", "/register"],
};

