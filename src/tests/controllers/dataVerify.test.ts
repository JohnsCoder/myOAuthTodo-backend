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

describe("/auth", () => {
  test("/register - POST", async () => {
    await req
      .post("/auth/register")
      .send({ ...user, number: "" })
      .then((res) => {
        expect(res.body.error.message).toEqual("cannot have empty values");
        expect(res.statusCode).toEqual(400);
      });
  });
});
