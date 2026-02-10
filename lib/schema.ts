
import { pgTable, text, decimal, timestamp, uuid } from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull(),
    description: text('description'),
    price: decimal('price', { precision: 10, scale: 2 }).notNull(),
    size: text('size').notNull(),
    imageUrl: text('image_url').notNull(),
    category: text('category').default('miel'),
    createdAt: timestamp('created_at').defaultNow(),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
