import jwt, { JwtPayload } from "jsonwebtoken";

function jwtVerify(tokenid: string) {
  return jwt.verify(tokenid, process.env.PRIVATE_KEY || "0000") as JwtPayload;
}

function jwtSign(payload: string): string {
  return jwt.sign({ id: payload }, process.env.PRIVATE_KEY || "0000", {
    expiresIn: "24hr",
  });
}

export { jwtSign, jwtVerify };
