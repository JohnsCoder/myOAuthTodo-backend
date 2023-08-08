import { randomUUID } from "crypto";
import supertest from "supertest";
import User from "../../database/models/user.model";
import sequelize from "../../database/sequelize";
import { TodoEntity } from "../../entities/todo.entity";
import { UserEntity } from "../../entities/user.entity";
import { jwtSign } from "../../utils/jwt";
import server from "../../server";
import { unsubscribe } from "diagnostics_channel";

const req = supertest(server);

const user: UserEntity = {
  id: randomUUID(),
  nickname: "user",
  email: "user@email.com",
  number: "123456789",
  password: "user123",
};

const todo: TodoEntity = {
  id: 1,
  content: "todo_note",
  user_id: user.id,
};

let token: string;

beforeAll(async () => {
  await User.create(user);
  token = jwtSign(user.id!);
});

afterAll(async () => {
  await User.destroy({
    where: {
      id: user.id,
    },
  });

  await sequelize.end();
});

describe("/todo - GOOD PATH", () => {
  test("/ - POST", async () => {
    await req
      .post("/todo/")
      .set("Authorization", `Bearer ${token}`)
      .send(todo)
      .then((res) => {
        expect(res.statusCode).toEqual(201);
      });
  });

  test("/:id - PUT", async () => {
    await req
      .put(`/todo/${todo.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ content: "updated" })
      .then((res) => {
        expect(res.statusCode).toEqual(200);
      });
  });

  // test("/:id - PUT", async () => {
  //   await req
  //     .put(`/todo/${todo.id}`)
  //     .set("Authorization", `Bearer ${token}`)
  //     .send({ content: "" })
  //     .then((res) => {
  //       expect(res.statusCode).toEqual(200);
  //     });
  // });

  test("/ - GET", async () => {
    await req
      .get("/todo/")
      .set("Authorization", `Bearer ${token}`)
      .then((res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.data[0].content).toEqual("updated");
      });
  });

  test("/:id - DELETE", async () => {
    await req
      .delete(`/todo/${todo.id}`)
      .set("Authorization", `Bearer ${token}`)
      .then((res) => {
        expect(res.statusCode).toEqual(200);
      });
  });

});


describe("/todo - BAD PATH", () => {

  test("/ - POST exception", async () => {
    await req
      .post("/todo/")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...todo, content: undefined })
      .then((res) => {
        expect(res.body.error.message).toEqual("todo.content cannot be null");
        expect(res.statusCode).toEqual(400);
      });
  });

  test("/:id - PUT todo dont found", async () => {
    await req
      .put(`/todo/${todo.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ content: undefined })
      .then((res) => {
        expect(res.body.error.message).toEqual("couldn't find todo");
        expect(res.statusCode).toEqual(404);
      });
  });

  test("/:id - PUT exception", async () => {
    await req
      .put(`/todo/${undefined}`)
      .set("Authorization", `Bearer ${token}`)
      .send({  content: "dont will be updated" })
      .then((res) => {
        expect(res.body.error.message).toEqual('invalid input syntax for type integer: "NaN"');
        expect(res.statusCode).toEqual(400);
      });
  });

  test("/:id - DELETE user don't found", async () => {
    await req
      .delete(`/todo/${10}`)
      .set("Authorization", `Bearer ${token}`)
      .then((res) => {
        expect(res.body.error.message).toEqual("couldn't find todo");
        expect(res.statusCode).toEqual(404);
      });
  });
  test("/:id - DELETE exception", async () => {
    await req
      .delete(`/todo/${undefined}`)
      .set("Authorization", `Bearer ${token}`)
      .then((res) => {
        expect(res.body.error.message).toEqual('column \"nan\" does not exist');
        expect(res.statusCode).toEqual(400);
      });
  });
});
