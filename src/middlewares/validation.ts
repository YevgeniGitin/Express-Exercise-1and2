import { Request, Response, NextFunction } from "express";
import * as schema from "../validation/validationScemas";
import joi from "joi";

export function idValidation(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  const { error, value } = joi.validate(id, schema.idschema);
  if (error !== null) {
    throw new Error("input-validation");
  }
  next();
}

export function nameValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.method === "POST" || req.method === "PUT") {
    const { error, value } = joi.validate(req.body.name, schema.nameschema);
    if (error !== null) {
      throw new Error("input-validation");
    }
  }
  next();
}
