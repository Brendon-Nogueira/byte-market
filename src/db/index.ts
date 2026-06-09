import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './drizzle/schemas/schema';
import dotenv from 'dotenv';


if (!process.env.DATABASE_URL) {
  dotenv.config();
}

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL variavel de ambiente não encontrada');
}

const sql = neon(process.env.DATABASE_URL);


export const db = drizzle({
  client: sql,
  schema: {
    products: schema.products,
    users: schema.users,
    orders: schema.orders,
    orderItems: schema.orderItems,
    usersRelations: schema.usersRelations,
    ordersRelations: schema.ordersRelations,
    orderItemsRelations: schema.orderItemsRelations,
  },
  // logger: true
});
