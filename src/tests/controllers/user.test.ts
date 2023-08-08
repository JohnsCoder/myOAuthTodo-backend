import { randomUUID } from "crypto";
import { UserEntity } from "../../entities/user.entity";
import supertest from "supertest";
import server from "../../server";
import User from "../../database/models/user.model";
import { jwtSign } from "../../utils/jwt";
import sequelize from "../../database/sequelize";
import controller from "../../controllers/user.controller";

const req = supertest(server);

const user: UserEntity = {
  id: randomUUID(),
  nickname: "user",
  email: "user@email.com",
  number: "123456789",
  password: "user123",
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

describe("/user", () => {
  test("/nick - GET", async () => {
    await req
      .get("/user/nick")
      .set("Authorization", `Bearer ${token}`)
      .then((res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.nickname).toEqual("user");
      });
  });
  test("/nick - GET exception", async () => {
    await req
      .get("/user/nick")
      .set("Authorization", `Bearer ${jwtSign(randomUUID())}`)
      .then((res) => {
        expect(res.statusCode).toEqual(404);
        expect(res.body.error.message).toEqual("couldn't find nickname");
      });
  });
});
