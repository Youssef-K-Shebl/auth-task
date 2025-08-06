import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import ExposableError from "../error/ExposableError";

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ExposableError("Validation Error", 400, errors);
  }
  next();
};
