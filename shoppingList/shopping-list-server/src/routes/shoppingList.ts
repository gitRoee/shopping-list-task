import { Router } from "express";
import { ShoppingListConnectionController } from "../controllers/shoppingListConnection";

export const shoppingList = Router();

const shoppingListConnectionController = new ShoppingListConnectionController();

shoppingList.post("/", async (req, res) => {
    try {
    const cartId = await shoppingListConnectionController.addShoppingList(req.body.data);
    res.send(cartId);
    } catch (error) {
    res.status(500).json({ error });
    }
})