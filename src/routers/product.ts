import { Router } from "express";
import * as productController from "../controllers/product.controllers";
const router = Router();
//get all products
router.get("/", productController.getAll);
//get product by id
router.get("/:id", productController.findProduct, productController.getProductById);
//add product
router.post("/", productController.addProduct);
//update product by id
router.put("/:id", productController.findProductIndex, productController.updateProductById);
//delete product
router.delete("/:id", productController.findProductIndex, productController.deleteItem);

export { router };
