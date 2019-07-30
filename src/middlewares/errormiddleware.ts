import { Request, Response, NextFunction } from "express";

export function Errors( err: Error, req: Request, res: Response, next: NextFunction) {
  // tslint:disable-next-line: no-console
  if (err.message === "input-validation") {
    res.status(400).send("error");
  } else {
    next(err);
  }
}
