"use server";

import { userRepository } from "@/repositories/user/user-repository";
import bcrypt from "bcryptjs";
import * as jose from "jose";
import { cookies } from "next/headers";

// removi a fallback hardcoded para lançar uma exceção se o JWT_SECRET não estiver configurado.
const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET não está configurado nas variáveis de ambiente.');
  return new TextEncoder().encode(secret);
};

// funcoes auxiliares jwt
async function signJWT(payload: { id: number; name: string; email: string }) {
  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getJwtSecret());
}

export async function verifyJWT(token: string) {
  try {
    const { payload } = await jose.jwtVerify(token, getJwtSecret());
    return payload as { id: number; name: string; email: string };
  } catch {
    return null;
  }
}


export async function registerAction(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { success: false, error: "Preencha todos os campos obrigatórios." };
  }

  try {
    // verifica se existe usuario por email
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      return { success: false, error: "Este e-mail já está cadastrado." };
    }

    // criptografa a senha
    const passwordHash = await bcrypt.hash(password, 10);

    // cria o usuario
    const user = await userRepository.create({
      name,
      email,
      passwordHash,
    });

    // gera o token jwt
    const token = await signJWT({ id: user.id, name: user.name, email: user.email });

    // salva o token no cookie
    const cookieStore = await cookies();
    cookieStore.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      path: "/",
    });

    return { success: true };
  } catch (error) {
    console.error("Erro no registro do usuário:", error);
    return { success: false, error: "Ocorreu um erro interno ao realizar o registro." };
  }
}

// login
export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, error: "E-mail e senha são obrigatórios." };
  }

  try {
    // busca o usuario por email
    const user = await userRepository.findByEmail(email);
    if (!user) {
      return { success: false, error: "E-mail ou senha incorretos." };
    }

    // compara a senha com a criptografada
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return { success: false, error: "E-mail ou senha incorretos." };
    }

    // gera token
    const token = await signJWT({ id: user.id, name: user.name, email: user.email });

    // salva o token no cookie
    const cookieStore = await cookies();
    cookieStore.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      path: "/",
    });

    return { success: true };
  } catch (error) {
    console.error("Erro no login do usuário:", error);
    return { success: false, error: "Ocorreu um erro interno ao tentar realizar o login." };
  }
}

//logout
export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

// busca o usuario na sessao atual
export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;
    if (!token) return null;

    const payload = await verifyJWT(token);
    if (!payload) return null;

    return {
      id: payload.id,
      name: payload.name,
      email: payload.email,
    };
  } catch {
    return null;
  }
}
