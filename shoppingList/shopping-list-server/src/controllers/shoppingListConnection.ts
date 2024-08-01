import { ShoppingListConnectionService } from "../services/shoppingListConnection";
import { itemsByCategory } from "../types/item";

export class ShoppingListConnectionController {
    #shoppingListConnectionService: ShoppingListConnectionService;

    constructor() {
        this.#shoppingListConnectionService = new ShoppingListConnectionService();
    }

    public async addShoppingList (shoppingList: itemsByCategory) {
        if (Object.keys(shoppingList).length > 0) {
            return this.#shoppingListConnectionService.addShoppingList(shoppingList);
        } else {
            throw Error("List is empty")
        }
    }
}