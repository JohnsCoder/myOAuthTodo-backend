import express from "express";
import cors from "cors";
import "dotenv/config";
import router from "./routes/auth";
const port = 8000;
const app = express();

app.use(express.urlencoded());
app.use(cors());
app.use("/auth", router);

app.listen(port, () => console.log(`app running on http://localhost:${port}`));
