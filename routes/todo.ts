import Express from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import mysql from "mysql";
import "dotenv/config";

const todo = Express.Router();
const db = mysql.createConnection(process.env.DATABASE_URL || "");

todo.post("/get-todo", (expReq, expRes) => {
  const SQL_id =
    "SELECT todos.idTodos, todos.todos FROM login, todos WHERE login.id = ? AND todos.id = ? ORDER BY idTodos DESC;";
  const id = jwt.verify(
    expReq.body.tokenid,
    process.env.PRIVATE_KEY || ""
  ) as JwtPayload;
  db.query(SQL_id, [id.id, id.id], (dbErr, dbRes) => {
    if (dbErr) {
      expRes.status(500).send("invalid token");
      throw dbErr.message;
    }
    expRes.send(dbRes);
  });
});

todo.post("/send-todo", (expReq, expRes) => {
  const SQL_id = "INSERT INTO todos (id, todos) VALUES (?, ?)";
  const id = jwt.verify(
    expReq.body.tokenid,
    process.env.PRIVATE_KEY || ""
  ) as JwtPayload;
  db.query(SQL_id, [id.id, expReq.body.todo], (dbErr, dbRes) => {
    if (dbErr) {
      expRes.status(500).send("invalid token");
      throw dbErr.message;
    }
    expRes.send(dbRes);
  });
});

todo.delete("/delete-todo/:id", (expReq, expRes) => {
  const SQL_id = "DELETE FROM todos WHERE idTodos = ?";
  db.query(SQL_id, expReq.params.id, (dbErr, dbRes) => {
    if (dbErr) {
      expRes.status(500).send("invalid token");
      throw dbErr.message;
    }
    expRes.send(dbRes);
  });
});

export default todo;
