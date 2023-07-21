import User from "../database/models/user.model";
import responseHandler from "../utils/responseHandler";

async function findNickname(id: string) {
  const data = await User.findByPk(id, {
    attributes: ["nickname"],
  });

  if (data) {
    return responseHandler.sucessful({ nickname: data.get().nickname! }, 200);
  }
  return responseHandler.errorMessage(
    { message: "couldn't find nickname" },
    404
  );
}

export { findNickname };

