import { Request, Response, NextFunction } from "express";
import { Product } from "../models/product";
import * as productServices from "../services/product.services";
//handlers to routing
export const findProduct = productServices.findProduct;
export const findProductIndex = productServices.findProductIndex;

export async function getAll(req: Request, res: Response, next: NextFunction) {
  console.log("get all products");
  try {
    const productarr = await productServices.getAll();
    res.status(200).send(productarr);
  } catch (err) {
    next(err);
  }
}

export function getProductById(req: Request, res: Response, next: NextFunction) {
  console.log("get product by id");
  const { matching, id } = res.locals;
  res.status(200).send(matching);
}

export async function addProduct(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("add product");
    const temp: Product = req.body;
    const product = await productServices.addProduct(temp);
    res.status(201).send(product);
  } catch (err) {
    next(err);
  }
}

export async function updateProductById( req: Request, res: Response, next: NextFunction) {
  try {
    console.log("update product by id");
    const { matchingIndex, id } = res.locals;
    let temp: Product = req.body;
    const product = await productServices.updateProductById(
      matchingIndex,
      id,
      temp
    );
    res.status(200).send(product);
  } catch (err) {
    next(err);
  }
}

export async function deleteItem( req: Request, res: Response, next: NextFunction) {
  try {
    console.log("delete item");
    const { matchingIndex, id } = res.locals;
    productServices.deleteItem(matchingIndex);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
}
