import jwt from "jsonwebtoken";

function jwtVerify(tokenid: string) {
  try {
    return jwt.verify(tokenid, process.env.PRIVATE_KEY || "0000");
  } catch (err) {
    return err;
  }
}

function jwtSign(payload: string) {
  try {
    return jwt.sign({ id: payload }, process.env.PRIVATE_KEY || "0000", {
      expiresIn: "24hr",
    });
  } catch (err) {
    return err;
  }
}

export { jwtSign, jwtVerify };
