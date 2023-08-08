import { NextFunction, Request, Response } from "express";
import Resp from "../utils/responseHandler";

const emptyString = (req: Request, res: Response, next: NextFunction) => {
  const values = Object.values(req.body);
  for (const value of values) {
    if (!value) {
      const { code, ...data } = Resp(
        { message: "cannot have empty values" },
        400
      );
      res.status(code).send(data);
      return;
    }
  }
  next();
};

export { emptyString };
