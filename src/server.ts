import "dotenv/config";
import cors, { CorsOptions } from "cors";
import express, { json } from "express";
import auth from "./controllers/auth.controller";
import todo from "./controllers/todo.controller";
import { emptyString } from "./middlewares/dataVerify.middleware";
import user from "./controllers/user.controller";

export default function server() {
  const app = express();

  const corsOptions: CorsOptions = {
    origin: "*",
  };

  app.use(cors(corsOptions));

  app.get("/", (req, res) => res.status(200).send());

  app.use(json(), emptyString);

  app.use("/auth", auth);
  app.use("/user", user);
  app.use("/todo", todo);

  app.listen(process.env.PORT || 8000, () => "Your Application is running");
}
