import { Request, Response, NextFunction, Router } from "express";
//import data
import productjsonfile from "../models/products.json";
import { Product } from "../models/product";
import categoriesjsonfile from "../models/categories.json";
import { Categories } from "../models/categories";
import uuidv1 from "uuid/v1";

const router = Router();
//create array for prodacts and for categories
let productarr: Product[] = productjsonfile.product;
let categoriesarr: Categories[] = categoriesjsonfile.categories;
//handler for find Category
function findCategory(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  const matching = categoriesarr.find(o => o.id === id);
  if (id.length != 36) {
    res.sendStatus(400);
    return;
  }
  if (!matching) {
    res.sendStatus(404);
    return;
  }
  res.locals.matching = matching;
  res.locals.id = id;
  next();
}
//handler for find Category index in array
function findCategoryIndex(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  const matchingIndex = categoriesarr.findIndex(o => o.id === id);
  if (id.length != 36) {
    res.sendStatus(400);
    return;
  }
  if (matchingIndex < 0) {
    res.sendStatus(404);
    return;
  }
  res.locals.matchingIndex = matchingIndex;
  res.locals.id = id;
  next();
}
// get all categories
router.get("/", (req, res) => {
  console.log("get all categories");
  res.send(categoriesarr);
});
// get products by categories id
router.get("/:id/products", (req, res) => {
  console.log("get products by categories id");
  const id: string = req.params.id;
  //run a filter for gettin all the products
  const matching = productarr.filter(product => product.categoryId === id);
  if (id.length != 36) {
    res.sendStatus(400);
    return;
  }
  if (matching.length === 0) {
    res.sendStatus(404);
    return;
  }
  res.status(200).send(matching);
});
//get specific category
router.get("/:id", findCategory, (req, res) => {
  console.log("get specific category");
  const { matching, id } = res.locals;
  res.status(200).send(matching);
});
//add a new category
router.post("/", (req, res) => {
  console.log("add category");
  const category: Categories = req.body;
  category.id = uuidv1();
  categoriesarr.push(category);
  res.status(201).send(category);
});
//update category
router.put("/:id", findCategoryIndex, (req, res) => {
  console.log("update category");
  const { matchingIndex, id } = res.locals;
  let category: Categories = req.body;
  category.id = id;
  categoriesarr[matchingIndex] = category;
  res.status(200).send(categoriesarr[matchingIndex]);
});
//delete category
router.delete("/:id", findCategoryIndex, (req, res) => {
  console.log("delete category");
  const { matchingIndex, id } = res.locals;
  categoriesarr.splice(matchingIndex, 1);
  let matchingIndexproduct = productarr.findIndex(o => o.categoryId === id);
  //delete all the categories products
  while (matchingIndexproduct >= 0) {
    productarr.splice(matchingIndexproduct, 1);
    matchingIndexproduct = productarr.findIndex(o => o.categoryId === id);
  }
  res.sendStatus(204);
});

export { router };
