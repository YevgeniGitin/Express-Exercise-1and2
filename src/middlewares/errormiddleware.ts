import { Request, Response, NextFunction } from "express";

export function Errors(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // tslint:disable-next-line: no-console
  if (err.message === "input-validation") {
    res.status(400).send("input error");
  } else if (err.message === "not-found") {
    res.status(404).send("not found");
  } else {
    res.send(err.message);
  }
}
