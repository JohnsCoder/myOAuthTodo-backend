import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { jwtVerify } from "../utils/jwt";

const authToken = async (req: Request, res: Response, next: NextFunction) => {

  const token = req.headers.authorization?.split(" ")[1];
  const data = (jwtVerify(token!) as JwtPayload).id;
  
  if (data) {
    req.body.user_id = data;
    next();
    return;
  }
  res.status(401).send("invalid token");
  return;
};

export { authToken };
