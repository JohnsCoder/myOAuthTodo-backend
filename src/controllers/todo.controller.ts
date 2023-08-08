import Express from "express";
import { authToken } from "../middlewares/auth.middleware";
import { emptyString } from "../middlewares/dataVerify.middleware";
import {
  deleteTodo,
  findTodo,
  insertTodo,
  updateTodo,
} from "../services/todo.service";
const todo = Express.Router();

todo.get("/", authToken, emptyString, async (req, res) => {
  const { code, ...data } = await findTodo(req.body.user_id);

  res.status(code).send(data);
});

todo.post("/", authToken, emptyString, async (req, res) => {
  const { code, ...data } = await insertTodo(req.body);
  res.status(code).send(data);
});

todo.put("/:id", authToken, async (req, res) => {
  const { code, ...data } = await updateTodo({
    id: parseInt(req.params.id),
    content: req.body.content,
  });
  res.status(code).send(data);
});

todo.delete("/:id", authToken, emptyString, async (req, res) => {
  const { code, ...data } = await deleteTodo(parseInt(req.params.id));
  res.status(code).send(data);
});

export default todo;
