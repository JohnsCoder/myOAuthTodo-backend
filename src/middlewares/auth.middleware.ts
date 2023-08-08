import { NextFunction, Request, Response } from "express";
import { jwtVerify } from "../utils/jwt";
import Resp from "../utils/responseHandler";

const authToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1]!;

  try {
    const data = jwtVerify(token).id;
    req.body.user_id = data;
    next();
    return;
  } catch (err) {
    const { code, ...data } = Resp({ message: "invalid token"} , 401);
    res.status(code).send(data);
    return;
  }
};

export { authToken };
