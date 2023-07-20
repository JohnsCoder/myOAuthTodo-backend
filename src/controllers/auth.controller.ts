import Express, { urlencoded } from "express";
import { authToken } from "../middlewares/auth.middleware";
import { findNickName, login, register } from "../services/auth.service";

const auth = Express.Router();

auth.post("/register", async (req, res) => {
  const { code, ...data } = await register(req.body);
  res.status(code).send(data);
});

auth.post("/login", urlencoded({ extended: false }), async (req, res) => {
  const { code, ...data } = await login(req.body);
  res.status(code).send(data);
});

auth.get("/nick", authToken, async (req, res) => {
  const { code, ...data } = await findNickName(req.body.user_id);
  res.status(code).send(data);
});

export default auth;
