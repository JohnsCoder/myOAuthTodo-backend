"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const db = mysql_1.default.createConnection(process.env.DATABASE_URL || "");
const mysqlDB = {
    register: (values) => {
        const SQL = "INSERT INTO login (nickname, email, number,  password_hash) VALUES (?, ?, ?, ?);";
        return db.query(SQL, [...values], (err) => err);
    },
};
exports.default = mysqlDB;
