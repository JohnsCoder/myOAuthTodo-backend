import { randomUUID } from "crypto";
import supertest from "supertest";
import User from "../../database/models/user.model";
import sequelize from "../../database/sequelize";
import { UserEntity } from "../../entities/user.entity";
import server from "../../server";
import crypt from "../../utils/bcrypt";
import { jwtSign } from "../../utils/jwt";

const req = supertest(server);

const user: UserEntity = {
  id: randomUUID(),
  nickname: "user",
  email: "user@email.com",
  number: "123456789",
};
let token: string;

beforeAll(async () => {
  user.password = await crypt.encrypt("user123");
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

describe("/auth - GOOD PATH", () => {
  test("/register - POST", async () => {
    await req
      .post("/auth/register")
      .send(user)
      .then((res) => {
        expect(res.statusCode).toEqual(201);
      });
  });

  test("/login - POST", async () => {
    await req
      .post("/auth/login")
      .send({ email: user.email, password: user.password })
      .then((res) => {
        expect(res.statusCode).toEqual(202);
      });
  });

  test("/ - GET", async () => {
    await req
      .get("/auth/")
      .set("Authorization", `Bearer ${token}`)
      .then((res) => {
        expect(res.statusCode).toEqual(204);
      });
  });
});

describe("/auth - BAD PATH", () => {
  test("/register - POST exception", async () => {
    await req
      .post("/auth/register")
      .send({ ...user, id: undefined })
      .then((res) => {
        expect(res.body.error.message).toEqual("email must be unique");
        expect(res.statusCode).toEqual(400);
      });
  });

  test("/login - POST exception", async () => {
    await req
      .post("/auth/login")
      .send({ email: user.email, password: "john123" })
      .then((res) => {
        expect(res.statusCode).toEqual(401);
        expect(res.body.error.message).toEqual("couldn't find user");
      });
  });
  test("/login - POST user don't found", async () => {
    await req
      .post("/auth/login")
      .send({ email: user.email, password: undefined })
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.error.message).toEqual(
          "data and hash arguments required"
        );
      });
  });

  test("/ - GET exception", async () => {
    await req
      .get("/auth/")
      .set("Authorization", `Bearer ${token + "a"}`)
      .then((res) => {
        expect(res.body.error.message).toEqual("invalid token");
        expect(res.statusCode).toEqual(401);
      });
  });
});
