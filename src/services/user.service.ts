import User from "../database/models/user.model";
import Response from "../utils/responseHandler";

async function findNickname(id: string) {
  const data = await User.findByPk(id, {
    attributes: ["nickname"],
  });
  
  if (data) {
    return Response(undefined, 200, { nickname: data.get().nickname! });
  }
  return Response({ message: "couldn't find nickname" }, 404);
}

export { findNickname };
