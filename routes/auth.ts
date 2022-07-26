import Express from "express";
import jwt, { VerifyCallback, JwtPayload } from "jsonwebtoken";
import mysql from "mysql";
import bcrypt from "bcrypt";
import "dotenv/config";

const auth = Express.Router();
const db = mysql.createConnection(process.env.DATABASE_URL || "");

auth.post("/register", function (expReq, expRes) {
  const SQL_login =
    "INSERT INTO login (nickname, email, number,  password_hash) VALUES (?, ?, ?, ?);";
  db.query(
    SQL_login,
    [
      expReq.body.nickname,
      expReq.body.email,
      expReq.body.number,
      bcrypt.hashSync(expReq.body.password, 8),
    ],
    (dbErr) => {
      if (dbErr) {
        expRes.status(400).send("email aready used");
        throw dbErr.message;
      } else expRes.send("success data inserted");
    }
  );
});

auth.post("/login", (expReq, expRes) => {
  const SQL_password_hash =
    "SELECT id, password_hash FROM login WHERE email = ?";
  db.query(SQL_password_hash, expReq.body.email, (dbErr, dbRes) => {
    if (!dbRes.length) {
      expRes.status(400).send("email dont found");
    }

    const idToken = jwt.sign(
      { id: dbRes[0].id },
      process.env.PRIVATE_KEY || "",
      { expiresIn: "24hr" }
    );
    bcrypt.compareSync(expReq.body.password, dbRes[0].password_hash)
      ? expRes.send(idToken)
      : expRes.status(400).send("wrong password");
  });
});

auth.post("/authenticaded", (expReq, ExpRes) => {
  jwt.verify(expReq.body.tokenid, process.env.PRIVATE_KEY || "", ((err) => {
    if (err) return ExpRes.send("invalid token");
    ExpRes.status(200).send('succesful authenticated');
  }) as VerifyCallback);
});

auth.post("/nick", (expReq, expRes) => {
  const SQL_id = "SELECT nickname FROM login WHERE id = ?;";
  const id = jwt.verify(
    expReq.body.tokenid,
    process.env.PRIVATE_KEY || ""
  ) as JwtPayload;
  db.query(SQL_id, id.id, (dbErr, dbRes) => {
    if (dbErr) {
      expRes.status(500).send("invalid token");
      throw dbErr.message;
    }
    expRes.send(dbRes);
  });
});

export default auth;
