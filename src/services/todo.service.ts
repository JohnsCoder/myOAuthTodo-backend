import { Model } from "sequelize";
import Todo from "../database/models/todo.model";
import { TodoEntity } from "../entities/todo.entity";
import Response from "../utils/responseHandler";

async function findTodo(user_id: string) {
  const data = await Todo.findAll({
    where: { user_id },
    attributes: ["id", "content", "createdAt"],
    order: [["id", "DESC"]],
  });

  return Response(undefined, 200, data);
}

async function insertTodo(content: TodoEntity) {
  try {
    const id = await Todo.create(content);
    return Response(undefined, 201, id);
  } catch (err) {
    return Response(err, 400);
  }
}

async function updateTodo({ id, content }: TodoEntity) {
  try {
    const modifiedRows = await Todo.update({ content }, { where: { id } });
    if (modifiedRows[0] === 0) {
      return Response({ message: "couldn't find todo" }, 404);
    }
    if (!content) {
      await deleteTodo(id!);
    }
    return Response(undefined, 200);
  } catch (err) {
    return Response(err, 400);
  }
}

async function deleteTodo(id: number) {
  try {
    const modifiedRows = await Todo.destroy({ where: { id } });

    if (modifiedRows === 0) {
      return Response({ message: "couldn't find todo" }, 404);
    }
    return Response(undefined, 200);
  } catch (err) {
    return Response(err, 400);
  }
}

export { deleteTodo, findTodo, insertTodo, updateTodo };
