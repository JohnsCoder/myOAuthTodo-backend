"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const auth_1 = __importDefault(require("./routes/auth"));
const todo_1 = __importDefault(require("./routes/todo"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded());
app.use((0, cors_1.default)());
app.use("/auth", auth_1.default);
app.use("/todos", todo_1.default);
app.listen(process.env.PORT || 8000, () => console.log("Your Application is running"));
