import express from "express";
import cors from "cors";
import "dotenv/config";
import auth from "./routes/auth";
import todo from './routes/todo'
const port = 8000;
const app = express();

app.use(express.urlencoded());
app.use(cors());
app.use("/auth", auth);
app.use("/todos", todo);

app.listen(port, () => console.log(`app running on http://localhost:${port}`));
