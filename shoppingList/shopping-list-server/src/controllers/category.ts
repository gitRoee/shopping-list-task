import { CategoryService } from "../services/category";

export class CategoryController {
    #categoryService: CategoryService;

    constructor() {
        this.#categoryService = new CategoryService();
    }

    public async getAllCategories () {
        return this.#categoryService?.getAllCategories();
    }
}