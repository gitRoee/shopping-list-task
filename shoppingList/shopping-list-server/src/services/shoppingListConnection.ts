import { db } from '../config/db';
import { carts, categories, items, shoppingListConnection } from '../schemas/shoppingList';
import { itemsByCategory } from '../types/item';
import { eq} from 'drizzle-orm';

export class ShoppingListConnectionService {
    public async addShoppingList (shoppingList: itemsByCategory) {
        return await db.transaction(async (tx) => {
            const newCart = await tx.insert(carts).values({}).returning({insertedId: carts.id});
            const cartId = newCart[0].insertedId;
    
            for (const key of Object.keys(shoppingList)) {
              const itemsWithCategory = shoppingList[key];

              const category = await tx.select({categoryId: categories.id}).from(categories).where(eq(categories.id, itemsWithCategory.id));
    
              if (!category.length) {
                throw Error(`Category id ${itemsWithCategory} does not exist`);
              }
    
              for (const item of itemsWithCategory.items) {
                let itemRecord = await tx.select({itemId: items.id}).from(items).where(eq(items.name, item.name));
                
                if (!itemRecord.length) {
                    itemRecord = await tx.insert(items).values({ name: item.name }).returning({itemId: items.id});
                }
    
                await tx.insert(shoppingListConnection).values({
                  itemId: itemRecord[0].itemId,
                  cartId: cartId,
                  categoryId: itemsWithCategory.id,
                  quantity: item.count,
                });
              }
            }

            return cartId;
        });
    };
}
