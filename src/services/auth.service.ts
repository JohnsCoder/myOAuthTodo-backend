import User from "../database/models/user.model";
import { UserEntity } from "../entities/user.entity";
import bcrypt from "../utils/bcrypt";
import { jwtSign } from "../utils/jwt";
import Response from "../utils/responseHandler";

async function register(user: UserEntity) {
  try {
    const password = await bcrypt.encrypt(user.password!);
    await User.create({ ...user, password });

    return Response(undefined, 201);
  } catch (err) {
    return Response(err, 400);
  }
}

async function login({ email, password }: UserEntity) {
  try {
    const data = await User.findOne({
      where: { email },
      attributes: ["id", "password"],
    });

    if (data) {
      const authenticaded = await bcrypt.decrypt(
        password!,
        data.get().password!
      );
      if (authenticaded) {
        return Response(undefined, 202, { tokenId: jwtSign(data.get().id!) });
      }
    }
    return Response({ message: "couldn't find user" }, 401);
  } catch (err) {
    return Response(err, 400);
  }
}

export { login, register };

