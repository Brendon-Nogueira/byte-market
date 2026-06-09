import { pgTable, serial, varchar, text, decimal, integer, boolean, timestamp, doublePrecision } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  brand: varchar('brand', { length: 255 }).notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  description: text('description').notNull(),
  image: text('image').notNull(),
  storage: varchar('storage', { length: 50 }),
  stock: integer('stock').notNull().default(0),
  category: varchar('category', { length: 100 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  color: varchar('color', { length: 100 }),
  releaseDate: varchar('release_date', { length: 100 }),
  isAvailable: boolean('is_available').notNull().default(true),
  rating: doublePrecision('rating').notNull().default(0.0),
  reviewCount: integer('review_count').notNull().default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});


// export type ProductsTableSelectModel = InferSelectModel<typeof products>;
// export type ProductsTableInsertModel = InferInsertModel<typeof products>;

export type ProductsTableSelectModel = typeof products.$inferSelect;
export type ProductsTableInsertModel = typeof products.$inferInsert;

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export type UserSelectModel = typeof users.$inferSelect;
export type UserInsertModel = typeof users.$inferInsert;


export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  status: varchar('status', { length: 50 }).notNull().default('pending'),
  // 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'

  total: decimal('total', { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export type OrderSelectModel = typeof orders.$inferSelect;
export type OrderInsertModel = typeof orders.$inferInsert;



export const orderItems = pgTable('order_items', {
  id: serial('id').primaryKey(),
  orderId: integer('order_id').notNull().references(() => orders.id, { onDelete: 'cascade' }),
  productId: integer('product_id').notNull().references(() => products.id, { onDelete: 'restrict' }),
  quantity: integer('quantity').notNull(),
  
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
});

export type OrderItemSelectModel = typeof orderItems.$inferSelect;
export type OrderItemInsertModel = typeof orderItems.$inferInsert;



export const usersRelations = relations(users, ({ many }) => ({
  orders: many(orders),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, { fields: [orders.userId], references: [users.id] }),
  items: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, { fields: [orderItems.orderId], references: [orders.id] }),
  product: one(products, { fields: [orderItems.productId], references: [products.id] }),
}));
