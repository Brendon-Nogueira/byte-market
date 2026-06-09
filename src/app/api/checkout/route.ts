import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import * as jose from 'jose';
import { db } from '@/db';
import { products } from '@/db/drizzle/schemas/schema';
import { eq, sql } from 'drizzle-orm';
import { orderRepository } from '@/repositories/order/order-repository';

// JWT_SECRET sem fallback
const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET não está configurado nas variáveis de ambiente.');
  return new TextEncoder().encode(secret);
};

// validação Zod
const checkoutItemSchema = z.object({
  productId: z.number().int().positive('productId deve ser um inteiro positivo'),
  quantity: z.number().int().positive('quantity deve ser um inteiro positivo'),
  price: z.number().positive('price deve ser um número positivo'),
});

const checkoutBodySchema = z.object({
  items: z.array(checkoutItemSchema).min(1, 'O carrinho não pode estar vazio'),
});

export async function POST(request: NextRequest) {

  // verificar autenticação via JWT no cookie
  const token = request.cookies.get('session')?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, error: 'Não autenticado. Faça login para finalizar a compra.' },
      { status: 401 },
    );
  }

  let userId: number;
  try {
    const { payload } = await jose.jwtVerify(token, getJwtSecret());
    userId = payload.id as number;
  } catch {
    return NextResponse.json(
      { success: false, error: 'Sessão inválida ou expirada. Faça login novamente.' },
      { status: 401 },
    );
  }

  // valida o body com o zod
  let body: z.infer<typeof checkoutBodySchema>;
  try {
    const raw = await request.json();
    body = checkoutBodySchema.parse(raw);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Dados do carrinho inválidos.', details: error.errors },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { success: false, error: 'Body da requisição inválido.' },
      { status: 400 },
    );
  }

  // verifica o estoque de cada produto no banco
  const productIds = body.items.map((item) => item.productId);

  const dbProducts = await db
    .select({ id: products.id, stock: products.stock, price: products.price, name: products.name })
    .from(products)
    .where(sql`${products.id} = ANY(ARRAY[${sql.join(productIds.map(id => sql`${id}`), sql`, `)}]::int[])`);

  const productMap = new Map(dbProducts.map((p) => [p.id, p]));

  for (const item of body.items) {
    const product = productMap.get(item.productId);

    if (!product) {
      return NextResponse.json(
        { success: false, error: `Produto ID ${item.productId} não encontrado.` },
        { status: 404 },
      );
    }

    if (product.stock < item.quantity) {
      return NextResponse.json(
        {
          success: false,
          error: `Estoque insuficiente para "${product.name}". Disponível: ${product.stock}, solicitado: ${item.quantity}.`,
        },
        { status: 409 },
      );
    }
  }

  // debita do estoque e gera o pedido
  let total = 0;
  const itemsWithServerPrice = body.items.map((item) => {
    const product = productMap.get(item.productId)!;
    const serverPrice = Number(product.price);
    total += serverPrice * item.quantity;
    return { ...item, price: serverPrice };
  });

  try {
    // debito individual
    for (const item of body.items) {
      await db
        .update(products)
        .set({ stock: sql`${products.stock} - ${item.quantity}` })
        .where(eq(products.id, item.productId));
    }

    // cria o pedido com o preço calculado no servidor
    const order = await orderRepository.create(userId, itemsWithServerPrice, total);

    return NextResponse.json(
      {
        success: true,
        orderId: order.id,
        total: Number(order.total),
        message: 'Pedido criado com sucesso!',
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('[CHECKOUT ERROR]', error);
    return NextResponse.json(
      { success: false, error: 'Erro interno ao processar o pedido. Tente novamente.' },
      { status: 500 },
    );
  }
}
