import { Request, Response, NextFunction, Router } from "express";
import productjsonfile from "../models/products.json";
import { Product } from "../models/product";
import uuidv1 from "uuid/v1";

let productarr: Product[] = productjsonfile.product;
const router = Router();

function findProduct(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  const matching = productarr.find(o => o.id === id);
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

function findProductIndex(req: Request, res: Response, next: NextFunction) {
  const id: string = req.params.id;
  const matchingIndex: number = productarr.findIndex(o => o.id === id);
  if (id.length != 36) {
    res.sendStatus(400);
    return;
  }
  if (req.body.name.length < 3) {
    res.sendStatus(409);
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

function findProductIndexForSDelete(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id: string = req.params.id;
  const matchingIndex: number = productarr.findIndex(o => o.id === id);
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

//get all products
router.get("/", (req, res) => {
  console.log("get all products");
  res.status(200).send(productarr);
});
//get product by id
router.get("/:id", findProduct, (req, res) => {
  console.log("get product by id");
  const { matching, id } = res.locals;
  res.status(200).send(matching);
});
//add product
router.post("/", (req, res) => {
  console.log("add product");
  const product: Product = req.body;
  if (product.name.length < 3) {
    res.sendStatus(409);
    return;
  }
  product.id = uuidv1();
  product.categoryId = uuidv1();
  productarr.push(product);
  res.status(201).send(product);
});
//update product by id
router.put("/:id", findProductIndex, (req, res) => {
  console.log("update product by id");
  const { matchingIndex, id } = res.locals;
  let product: Product = req.body;
  product.id = req.params.id;
  productarr[matchingIndex] = product;
  res.status(200).send(productarr[matchingIndex]);
});

router.delete("/:id", findProductIndexForSDelete, (req, res) => {
  console.log("delete item");
  const { matchingIndex, id } = res.locals;
  productarr.splice(matchingIndex, 1);
  res.sendStatus(204);
});

export { router };
