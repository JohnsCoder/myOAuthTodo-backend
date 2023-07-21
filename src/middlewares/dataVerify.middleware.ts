import { NextFunction, Request, Response } from "express";

const emptyString = (req: Request, res: Response, next: NextFunction) => {
  const values = Object.values(req.body);
  for (const value of values) {
    if (!value) {
      res.status(400).send({
        message: "cannot have empty values",
      });
      return;
    }
  }
  next();
};

export { emptyString };
