import express from "express";
import cors from "cors";
import "dotenv/config";
import auth from "./routes/auth";
import todo from "./routes/todo";
const app = express();

app.use(express.urlencoded());
app.use(cors());
app.use("/auth", auth);
app.use("/todos", todo);

app.listen(process.env.PORT || 8000, () =>
  console.log("Your Application is running")
);
