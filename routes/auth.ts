import Express from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import mysql from "mysql";
import bcrypt from "bcrypt";
import "dotenv/config";

const router = Express.Router();
const db = mysql.createConnection(process.env.DATABASE_URL || "");

router.post("/register", function (expReq, expRes) {
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
        expRes.send(dbErr?.message);
        throw dbErr.message;
      }
    }
  );
  const SQL_todos =
    "INSERT INTO todos (id, nickname ) VALUES ((SELECT id FROM login ORDER BY id DESC LIMIT 1 ), ?);";
  db.query(SQL_todos, [expReq.body.nickname], (dbErr) => {
    if (dbErr) {
      expRes.send(dbErr?.message);
      throw dbErr.message;
    }
    expRes.send("success data inserted");
  });
});

router.post("/login", (expReq, expRes) => {
  const SQL_password_hash =
    "SELECT id, password_hash FROM login WHERE email = ?";

  db.query(SQL_password_hash, expReq.body.email, (dbErr, dbRes) => {
    if (dbErr) {
      expRes.send('dbErr?.message');
      throw 'dbErr.message';
    }
    const idToken = jwt.sign(
      { id: dbRes[0].id },
      process.env.PRIVATE_KEY || "",
      { expiresIn: "24hr" }
    );
    bcrypt.compareSync(expReq.body.password, dbRes[0].password_hash)
      ? expRes.send(idToken)
      : expRes.send("unsuccess login");
  });
});

router.get("/todos", (expReq, expRes) => {
  const SQL_id = "SElECT nickname, todos FROM todos WHERE id = ?";
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

export default router;
