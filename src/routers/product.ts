import { Request, Response, NextFunction, Router } from "express";
import { Product } from "../models/product";
import uuidv1 from "uuid/v1";
import{productarr} from'../storeData/data';

const router = Router();

async function loadProducts(): Promise<Product[]> {
  return Promise.resolve(productarr);
}

async function findProduct(req: Request, res: Response, next: NextFunction) {
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

async function findProductIndex( req: Request, res: Response, next: NextFunction) {
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

//get all products
router.get("/", async (req, res, next) => {
  console.log("get all products");
  try {
    const productarr = await loadProducts();
    res.status(200).send(productarr);
  } catch (err) {
    next(err);
  }
});
//get product by id
router.get("/:id", findProduct, (req, res) => {
  console.log("get product by id");
  const { matching, id } = res.locals;
  res.status(200).send(matching);
});
//add product
router.post("/", async (req, res, next) => {
  try {
    console.log("add product");
    const product: Product = req.body;
    let productarr = await loadProducts();
    product.id = uuidv1();
    product.categoryId = uuidv1();
    productarr.push(product);
    res.status(201).send(product);
  } catch (err) {
    next(err);
  }
});
//update product by id
router.put("/:id", findProductIndex, async (req, res, next) => {
  try {
    console.log("update product by id");
    const { matchingIndex, id } = res.locals;
    let product: Product = req.body;
    let productarr = await loadProducts();
    product.id = req.params.id;
    productarr[matchingIndex] = product;
    res.status(200).send(productarr[matchingIndex]);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", findProductIndex, async (req, res, next) => {
  try {
    console.log("delete item");
    let productarr = await loadProducts();
    const { matchingIndex, id } = res.locals;
    productarr.splice(matchingIndex, 1);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

export { router };
