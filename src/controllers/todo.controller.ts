import Express, { json, urlencoded } from "express";
import { authToken } from "../middlewares/auth.middleware";
import { deleteTodo, findTodo, insertTodo } from "../services/todo.service";
const todo = Express.Router();

todo.get("/", authToken, async (req, res) => {
  const { code, ...data } = await findTodo(req.body.user_id);
  res.status(code).send(data);
});

todo.post("/", authToken, async (req, res) => {
  const { code, ...data } = await insertTodo(req.body);
  res.status(code).send(data);
});

todo.delete("/", authToken, async (req, res) => {
  const { code, ...data } = await deleteTodo(req.body.id);
  res.status(code).send(data);
});

export default todo;
