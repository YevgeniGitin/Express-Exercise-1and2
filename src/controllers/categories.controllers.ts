import { Request, Response, NextFunction } from "express";
import { Categories } from "../models/categories";
import * as categoriesServices from "../services/categories.services";
//handlers to routing
export const findCategory = categoriesServices.findCategory;
export const findCategoryIndex = categoriesServices.findCategoryIndex;

export async function getAllCategories(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("get all categories");
    const categories = await categoriesServices.getAllCategories();
    res.send(categories);
  } catch (err) {
    next(err);
  }
}

export async function getProductsByCategoriesId( req: Request, res: Response, next: NextFunction) {
  try {
    console.log("get products by categories id");
    const id: string = req.params.id;
    const products = await categoriesServices.getProductsByCategoriesId(id);
    res.status(200).send(products);
  } catch (err) {
    next(err);
  }
}

export function getSpecificCategory(req: Request, res: Response, next: NextFunction) {
  console.log("get specific category");
  const { matching, id } = res.locals;
  res.status(200).send(matching);
}

export async function addANewCategory(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("add category");
    const temp: Categories = req.body;
    const category = await categoriesServices.addANewCategory(temp);
    res.status(201).send(category);
  } catch (err) {
    next(err);
  }
}

export async function updateCategory(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("update category");
    const { matchingIndex, id } = res.locals;
    let temp: Categories = req.body;
    let category = await categoriesServices.updateCategory(
      temp,
      matchingIndex,
      id
    );
    res.status(200).send(category);
  } catch (err) {
    next(err);
  }
}

export async function deleteCategory(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("delete category");
    const { matchingIndex, id } = res.locals;
    categoriesServices.deleteCategory(matchingIndex,id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
}
