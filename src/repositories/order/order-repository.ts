import { db } from '@/db';
import { orders, orderItems } from '@/db/drizzle/schemas/schema';
import { OrderSelectModel, OrderItemSelectModel } from '@/db/drizzle/schemas/schema';
import { eq } from 'drizzle-orm';

export interface CheckoutItem {
  productId: number;
  quantity: number;
  price: number; // preço no momento da compra
}

export interface OrderWithItems extends OrderSelectModel {
  items: (OrderItemSelectModel & {
    product: { name: string; image: string; brand: string } | null;
  })[];
}

export class OrderRepository {
  
  // cria o pedido completo
  async create(
    userId: number,
    items: CheckoutItem[],
    total: number,
  ): Promise<OrderSelectModel> {
    
    const [order] = await db
      .insert(orders)
      .values({
        userId,
        total: total.toFixed(2),
        status: 'pending',
      })
      .returning();

    await db.insert(orderItems).values(
      items.map((item) => ({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price.toFixed(2),
      })),
    );

    return order;
  }

  // busca todos os pedidos por usuário
  async findByUserId(userId: number): Promise<OrderWithItems[]> {
    const result = await db.query.orders.findMany({
      where: eq(orders.userId, userId),
      orderBy: (orders, { desc }) => [desc(orders.createdAt)],
      with: {
        items: {
          with: {
            product: {
              columns: { name: true, image: true, brand: true },
            },
          },
        },
      },
    });

    return result as OrderWithItems[];
  }

  // busca pedido específico
  async findById(orderId: number): Promise<OrderWithItems | null> {
    const result = await db.query.orders.findFirst({
      where: eq(orders.id, orderId),
      with: {
        items: {
          with: {
            product: {
              columns: { name: true, image: true, brand: true },
            },
          },
        },
      },
    });

    return (result as OrderWithItems) ?? null;
  }
}

export const orderRepository = new OrderRepository();
