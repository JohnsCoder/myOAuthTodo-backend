import Express, { json, urlencoded } from "express";
import { authToken } from "../middlewares/auth.middleware";
import {
  deleteTodo,
  findTodo,
  insertTodo,
  updateTodo,
} from "../services/todo.service";
import { emptyString } from "../middlewares/dataVerify.middleware";
const todo = Express.Router();

todo.get("/", authToken, emptyString, async (req, res) => {
  const { code, ...data } = await findTodo(req.body.user_id);

  res.status(code).send(data);
});

todo.post("/", authToken, emptyString, async (req, res) => {
  const { code, ...data } = await insertTodo(req.body);
  res.status(code).send(data);
});

todo.put("/", authToken, async (req, res) => {
  const { code, ...data } = await updateTodo(req.body);
  res.status(code).send(data);
});

todo.delete("/", authToken, emptyString, async (req, res) => {
  const { code, ...data } = await deleteTodo(req.body.id);
  res.status(code).send(data);
});

export default todo;
