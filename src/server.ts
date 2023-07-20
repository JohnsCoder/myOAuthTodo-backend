import "dotenv/config";
import express, { json } from "express";
import auth from "./controllers/auth.controller";
import todo from "./controllers/todo.controller";
import { emptyString } from "./middlewares/emptyString.middleware";

export default function server() {
  const app = express();

  // const corsOptions = {
  //   origin: process.env.CLIENT_URL,
  //   methods: process.env.CLIENT_METHODS,
  // };

  // app.use(cors(corsOptions));

  app.get("/", (req, res) => res.status(204).send());

  app.use(json(), emptyString);

  app.use("/auth", auth);
  app.use("/todo", todo);

  app.listen(process.env.PORT || 8000, () => "Your Application is running");
}
