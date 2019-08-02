import { Request, Response, NextFunction } from "express";
import { Product } from "../models/product";
import { Categories } from "../models/categories";
import uuidv1 from "uuid/v1";
import { productarr, categoriesarr } from "../storeData/data";

async function loadProducts(): Promise<Product[]> {
  return Promise.resolve(productarr);
}

async function loadCategories(): Promise<Categories[]> {
  return Promise.resolve(categoriesarr);
}

export async function findCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    let categoriesarr = await loadCategories();
    const matching = categoriesarr.find(o => o.id === id);
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

export async function findCategoryIndex(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    let categoriesarr = await loadCategories();
    const matchingIndex = categoriesarr.findIndex(o => o.id === id);
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

export async function getAllCategories(): Promise<Categories[]> {
  try {
    const temp = await loadCategories();
    return categoriesarr;
  } catch (err) {
    throw new Error(err);
  }
}

export async function getProductsByCategoriesId(id: string): Promise<Product[]> {
  try {
    const productarr = await loadProducts();
    //run a filter for gettin all the products
    const matching = productarr.filter(product => product.categoryId === id);
    if (matching.length === 0) {
      throw new Error("not-found");
    } else {
      return matching;
    }
  } catch (err) {
    throw new Error(err);
  }
}

export async function addANewCategory(category: Categories) {
  try {
    let categories = await loadCategories();
    category.id = uuidv1();
    categories.push(category);
    return category;
  } catch (err) {
    throw new Error(err);
  }
}

export async function updateCategory(category: Categories, index: number, id: string): Promise<Categories> {
  try {
    let categoriesarr = await loadCategories();
    category.id = id;
    categoriesarr[index] = category;
    return category;
  } catch (err) {
    throw new Error(err);
  }
}

export async function deleteCategory(index: number, id: string) {
  try {
    let categories = await loadCategories();
    let products = await loadProducts();
    categoriesarr.splice(index, 1);
    let matchingIndexproduct = products.findIndex(o => o.categoryId === id);
    //delete all the categories products
    while (matchingIndexproduct >= 0) {
      products.splice(matchingIndexproduct, 1);
      matchingIndexproduct = products.findIndex(o => o.categoryId === id);
    }
  } catch (err) {
    throw new Error(err);
  }
}
