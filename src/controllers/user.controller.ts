import Express from "express";
import { authToken } from "../middlewares/auth.middleware";
import { findNickname } from "../services/user.service";

const user = Express.Router();

user.get("/nick", authToken, async (req, res) => {
  const { code, ...data } = await findNickname(req.body.user_id);
  res.status(code).send(data);
});

export default user;
