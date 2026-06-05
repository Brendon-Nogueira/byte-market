import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "bytemarket_secret_key_random_length_at_least_32_characters_long_921038"
);

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("session")?.value;
  let isTokenValid = false;

  if (token) {
    try {
      await jose.jwtVerify(token, JWT_SECRET);
      isTokenValid = true;
    } catch {
      isTokenValid = false;
    }
  }

  const { pathname } = request.nextUrl;

  
  const isProtectedRoute = pathname.startsWith("/wishlist");

  // login e registro
  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register");

  // redireciona sem token valido
  if (isProtectedRoute && !isTokenValid) {
    const loginUrl = new URL("/login", request.url);

    
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // login/registro, se estiver logado redireciona para a home
  if (isAuthPage && isTokenValid) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// define as rotas que utilizam a middleware/proxy
export const config = {
  matcher: ["/wishlist/:path*", "/login", "/register"],
};
