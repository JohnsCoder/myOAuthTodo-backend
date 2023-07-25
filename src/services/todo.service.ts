import { Model } from "sequelize";
import Todo from "../database/models/todo.model";
import { TodoEntity } from "../entities/todo.entity";
import responseHandler from "../utils/responseHandler";

async function findTodo(user_id: string) {
  const data = await Todo.findAll({
    where: { user_id },
    attributes: ["id", "content", "createdAt"],
    order: [["id", "DESC"]],
  });

  return responseHandler.sucessful(data, 200);
}

async function insertTodo(content: TodoEntity) {
  try {
    const id = await Todo.create(content);
    return responseHandler.sucessful(id, 201);
  } catch (err) {
    return responseHandler.errorMessage(err, 400);
  }
}

async function updateTodo({ id, content }: TodoEntity) {
  try {
    const modifiedRows = await Todo.update({ content }, { where: { id } });
    if (modifiedRows[0] === 0) {
      return responseHandler.errorMessage(
        { message: "couldn't find todo" },
        404
      );
    }
    if (!content) {
      await deleteTodo(id!);
    }
    return responseHandler.sucessful(undefined, 200);
  } catch (err) {
    return responseHandler.errorMessage(err, 400);
  }
}

async function deleteTodo(id: number) {
  try {
    const modifiedRows = await Todo.destroy({ where: { id } });

    if (modifiedRows === 0) {
      return responseHandler.errorMessage(
        { message: "couldn't find todo" },
        404
      );
    }
    return responseHandler.sucessful(undefined, 200);
  } catch (err) {
    return responseHandler.errorMessage(err, 400);
  }
}

export { deleteTodo, findTodo, insertTodo, updateTodo };
