import "dotenv/config";
import cors, { CorsOptions } from "cors";
import express, { json } from "express";
import auth from "./controllers/auth.controller";
import todo from "./controllers/todo.controller";
import user from "./controllers/user.controller";
import { emptyString } from "./middlewares/dataVerify.middleware";

const server = express();

const corsOptions: CorsOptions = {
  origin: "*",
};

server.use(cors(corsOptions));

server.get("/", (req, res) => res.status(200).send());

server.use(json());

server.use("/auth", emptyString, auth);
server.use("/user", emptyString, user);
server.use("/todo", todo);

export default server;
