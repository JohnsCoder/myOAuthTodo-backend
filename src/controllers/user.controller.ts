import Express from "express";
import { authToken } from "../middlewares/auth.middleware";
import { findNickName } from "../services/auth.service";

const user = Express.Router();

user.get("/nick", authToken, async (req, res) => {
  const { code, ...data } = await findNickName(req.body.user_id);
  res.status(code).send(data);
});

export default user;
