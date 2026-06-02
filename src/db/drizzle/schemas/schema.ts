import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { pgTable, serial, varchar, text, decimal, integer, boolean, timestamp, doublePrecision } from 'drizzle-orm/pg-core';

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
