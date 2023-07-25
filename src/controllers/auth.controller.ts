import Express, { urlencoded } from "express";
import { login, register } from "../services/auth.service";
import { authToken } from "../middlewares/auth.middleware";

const auth = Express.Router();

auth.post("/register", async (req, res) => {
  const { code, ...data } = await register(req.body);
  res.status(code).send(data);
});

auth.post("/login", urlencoded({ extended: false }), async (req, res) => {
  const { code, ...data } = await login(req.body);
  res.status(code).send(data);
});

auth.get("/", urlencoded({ extended: false }), authToken, async (req, res) => {
  res.status(204).send();
});

export default auth;
