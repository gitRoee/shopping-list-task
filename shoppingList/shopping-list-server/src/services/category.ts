import { db } from '../config/db';
import { categories } from '../schemas/shoppingList';

export class CategoryService {
    public async getAllCategories () {
        return await db.select().from(categories);
    }
}