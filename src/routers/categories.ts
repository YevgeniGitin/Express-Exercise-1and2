import {Router } from "express";
import * as categoriesControllers from "../controllers/categories.controllers"
const router = Router();
// get all categories
router.get("/", categoriesControllers.getAllCategories);
// get products by categories id
router.get("/:id/products", categoriesControllers.getProductsByCategoriesId);
//get specific category
router.get("/:id", categoriesControllers.findCategory,categoriesControllers.getSpecificCategory);
//add a new category
router.post("/", categoriesControllers.addANewCategory);
//update category
router.put("/:id", categoriesControllers.findCategoryIndex,categoriesControllers.updateCategory);
//delete category
router.delete("/:id", categoriesControllers.findCategoryIndex, categoriesControllers.deleteCategory);

export { router };
