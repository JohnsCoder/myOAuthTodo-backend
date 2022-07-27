"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mysql_1 = __importDefault(require("mysql"));
require("dotenv/config");
const todo = express_1.default.Router();
const db = mysql_1.default.createConnection(process.env.DATABASE_URL || "");
todo.post("/get-todo", (expReq, expRes) => {
    const SQL_id = "SELECT todos.idTodos, todos.todos FROM login, todos WHERE login.id = ? AND todos.idUser = ? ORDER BY idTodos DESC;";
    const id = jsonwebtoken_1.default.verify(expReq.body.tokenid, process.env.PRIVATE_KEY || "");
    db.query(SQL_id, [id.id, id.id], (dbErr, dbRes) => {
        if (dbErr) {
            expRes.status(500).send("invalid token");
            throw dbErr.message;
        }
        expRes.send(dbRes);
    });
});
todo.post("/send-todo", (expReq, expRes) => {
    const SQL_id = "INSERT INTO todos (idUser, todos) VALUES (?, ?)";
    const id = jsonwebtoken_1.default.verify(expReq.body.tokenid, process.env.PRIVATE_KEY || "");
    db.query(SQL_id, [id.id, expReq.body.todo], (dbErr, dbRes) => {
        if (dbErr) {
            expRes.status(500).send("invalid token");
            throw dbErr.message;
        }
        expRes.send(dbRes);
    });
});
todo.delete("/delete-todo/:id", (expReq, expRes) => {
    const SQL_id = "DELETE FROM todos WHERE idTodos = ?";
    db.query(SQL_id, expReq.params.id, (dbErr, dbRes) => {
        if (dbErr) {
            expRes.status(500).send("invalid token");
            throw dbErr.message;
        }
        expRes.send(dbRes);
    });
});
exports.default = todo;
