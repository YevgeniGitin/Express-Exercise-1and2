import { Request, Response, NextFunction, Router } from "express";
//import data
import productjsonfile from "../jsonFiles/products.json";
import { Product } from "../models/product";
import categoriesjsonfile from "../jsonFiles/categories.json";
import { Categories } from "../models/categories";
import uuidv1 from "uuid/v1";

const request = require("request-promise");
const client = request.defaults({
  baseUrl: "http://localhost:3002/public",
  json: true
});

const router = Router();
//create array for prodacts and for categories
async function loadProducts(): Promise<Product[]> {
  try {
    let list = await client.get("/products.json");
    return list.product;
  } catch (err) {
    throw new Error(err);
  }
}

async function loadCategories(): Promise<Categories[]> {
  try {
    let list = await client.get("/categories.json");
    return list.categories;
  } catch (err) {
    throw new Error(err);
  }
}

//handler for find Category
async function findCategory(req: Request, res: Response, next: NextFunction) {
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
//handler for find Category index in array
async function findCategoryIndex(
  req: Request,
  res: Response,
  next: NextFunction
) {
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
// get all categories
router.get("/", async (req, res, next) => {
  console.log("get all categories");
  const categoriesarr = await loadCategories();
  res.send(categoriesarr);
});
// get products by categories id
router.get("/:id/products", async (req, res, next) => {
  try {
    console.log("get products by categories id");
    const id: string = req.params.id;
    const productarr = await loadProducts();
    console.log(productarr);
    //run a filter for gettin all the products
    const matching = productarr.filter(product => product.categoryId === id);
    if (matching.length === 0) {
      throw new Error("not-found");
      return;
    }
    res.status(200).send(matching);
  } catch (err) {
    next(err);
  }
});
//get specific category
router.get("/:id", findCategory, (req, res) => {
  console.log("get specific category");
  const { matching, id } = res.locals;
  res.status(200).send(matching);
});
//add a new category
router.post("/", async (req, res, next) => {
  try {
    console.log("add category");
    let categoriesarr = await loadCategories();
    const category: Categories = req.body;
    category.id = uuidv1();
    categoriesarr.push(category);
    res.status(201).send(category);
  } catch (err) {
    next(err);
  }
});
//update category
router.put("/:id", findCategoryIndex, async (req, res, next) => {
  try {
    console.log("update category");
    const { matchingIndex, id } = res.locals;
    let category: Categories = req.body;
    let categoriesarr = await loadCategories();
    category.id = id;
    categoriesarr[matchingIndex] = category;
    res.status(200).send(categoriesarr[matchingIndex]);
  } catch (err) {
    next(err);
  }
});
//delete category
router.delete("/:id", findCategoryIndex, async (req, res, next) => {
  try {
    console.log("delete category");
    const { matchingIndex, id } = res.locals;
    let categoriesarr = await loadCategories();
    let productarr = await loadProducts();
    categoriesarr.splice(matchingIndex, 1);
    let matchingIndexproduct = productarr.findIndex(o => o.categoryId === id);
    //delete all the categories products
    while (matchingIndexproduct >= 0) {
      productarr.splice(matchingIndexproduct, 1);
      matchingIndexproduct = productarr.findIndex(o => o.categoryId === id);
    }
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

export { router };
