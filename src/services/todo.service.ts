import Todo from "../database/models/todo.model";
import { TodoEntity } from "../entities/todo.entity";
import responseHandler from "../utils/responseHandler";

async function findTodo(user_id: string) {
  const data = await Todo.findAll({
    where: { user_id },
    attributes: ["id", "content", "createdAt"],
  });

  if (data[0]) {
    return responseHandler.sucessful(data, 200);
  }
  return responseHandler.errorMessage(
    { message: "couldn't find any todo" },
    404
  );
}

async function insertTodo(content: TodoEntity) {
  try {
    await Todo.create(content);
    return responseHandler.sucessful(undefined, 201);
  } catch (err) {
    return responseHandler.errorMessage(err, 400);
  }
}

async function updateTodo({ id, content }: TodoEntity) {
  try {
    const modifiedRows = await Todo.update(
      { content: "value" },
      { where: { id } }
    );
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
    const data = await Todo.findByPk(id, { attributes: ["id"] });
    if (data) {
      await Todo.destroy({ where: { id } });
      return responseHandler.sucessful(undefined, 200);
    }
    return responseHandler.errorMessage({ message: "couldn't find todo" }, 404);
  } catch (err) {
    return responseHandler.errorMessage(err, 400);
  }
}

export { deleteTodo, findTodo, insertTodo, updateTodo };
