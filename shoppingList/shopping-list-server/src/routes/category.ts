import { Router } from "express";
import { CategoryController } from "../controllers/category";

export const categoryRouter = Router();

const categoryController = new CategoryController();

categoryRouter.get("/", async (req, res) => {
    const categories = await categoryController.getAllCategories();
    
    return res.send(categories);
})