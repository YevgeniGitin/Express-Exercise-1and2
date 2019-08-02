import { productarr } from "../storeData/data";
import uuidv1 from "uuid/v1";
import { Product } from "../models/product";
import { Request, Response, NextFunction } from "express";
//load the array
export async function loadProducts(): Promise<Product[]> {
  return Promise.resolve(productarr);
}
//handler to routing
export async function findProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    let productarr = await loadProducts();
    const matching = productarr.find(o => o.id === id);
    if (!matching) {
      throw new Error("not-found");
      return;
    }
    res.locals.matching = matching;
    res.locals.id = id;
    next();
  } catch (err) {
    next(err);
  }
}
//handler to routing
export async function findProductIndex(req: Request, res: Response, next: NextFunction) {
  try {
    const id: string = req.params.id;
    let productarr = await loadProducts();
    const matchingIndex: number = productarr.findIndex(o => o.id === id);
    if (matchingIndex < 0) {
      throw new Error("not-found");
      return;
    }
    res.locals.matchingIndex = matchingIndex;
    res.locals.id = id;
    next();
  } catch (err) {
    next(err);
  }
}
//load array and return him
export async function getAll(): Promise<Product[]> {
  try {
    let product = await loadProducts();
    return product;
  } catch {
    throw new Error("any error");
  }
}
//add product to array and return the product
export async function addProduct(temp: Product): Promise<Product> {
  try {
    let productarr = await loadProducts();
    temp.id = uuidv1();
    temp.categoryId = uuidv1();
    productarr.push(temp);
    return temp;
  } catch (err) {
    throw new Error(err);
  }
}
//update a product by index
export async function updateProductById(index: number, id: string, product: Product): Promise<Product> {
  try {
    let productarr = await loadProducts();
    product.id = id;
    productarr[index] = product;
    return product;
  } catch (err) {
    throw new Error(err);
  }
}
//delete item
export async function deleteItem(index: number) {
  try {
    let productarr = await loadProducts();
    productarr.splice(index, 1);
  } catch (err) {
    throw new Error(err);
  }
}
