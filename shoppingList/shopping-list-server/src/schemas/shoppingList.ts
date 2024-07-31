import { sql } from "drizzle-orm";
import { integer, pgSchema, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const schema = pgSchema("shopping_list");

export const items = schema.table('items', {
  id: uuid('id').default(sql`gen_random_uuid()`).primaryKey(),
  name: text('name').notNull(),
});

export const categories = schema.table('categories', {
  id: uuid('id').default(sql`gen_random_uuid()`).primaryKey(),
  name: text('name').notNull(),
});

export const carts = schema.table('carts', {
  id: uuid('id').default(sql`gen_random_uuid()`).primaryKey(),
  creation_date: timestamp("creation_date").defaultNow()
});

export const shoppingListConnection = schema.table('shopping_list_connection', {
  itemId: uuid('item_id').references(() => items.id),
  cartId: uuid('cart_id').references(() => carts.id),
  categoryId: uuid('category_id').references(() => categories.id),
  quantity: integer("quantity").notNull()
});
