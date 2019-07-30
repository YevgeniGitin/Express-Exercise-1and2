import { Request, Response, NextFunction } from "express";

export function idValidation(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  if (id.length != 36) {
    throw new Error('input-validation')
  }
  next();
}

export function nameValidation(req: Request, res: Response, next: NextFunction) {
  if (req.method === "POST" || req.method === "PUT") {
    if (req.body.name.length < 3) {
      throw new Error('input-validation')
    }
  }
  next();
}
