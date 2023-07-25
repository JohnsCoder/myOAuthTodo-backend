import User from "../database/models/user.model";
import { UserEntity } from "../entities/user.entity";
import bcrypt from "../utils/bcrypt";
import { jwtSign } from "../utils/jwt";
import responseHandler from "../utils/responseHandler";

async function register(user: UserEntity) {
  try {
    const password = await bcrypt.encrypt(user.password!);
    await User.create({ ...user, password });

    return responseHandler.sucessful(undefined, 201);
  } catch (err) {
    return responseHandler.errorMessage(err, 400);
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
        return responseHandler.sucessful(
          { tokenId: jwtSign(data.get().id!) },
          202
        );
      }
    }
    return responseHandler.errorMessage({ message: "couldn't find user" }, 401);
  } catch (err) {
    return responseHandler.errorMessage(err, 400);
  }
}

export { login, register };
