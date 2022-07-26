"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mysql_1 = __importDefault(require("mysql"));
const bcrypt_1 = __importDefault(require("bcrypt"));
require("dotenv/config");
const auth = express_1.default.Router();
const db = mysql_1.default.createConnection(process.env.DATABASE_URL || "");
auth.post("/register", function (expReq, expRes) {
    const SQL_login = "INSERT INTO login (nickname, email, number,  password_hash) VALUES (?, ?, ?, ?);";
    db.query(SQL_login, [
        expReq.body.nickname,
        expReq.body.email,
        expReq.body.number,
        bcrypt_1.default.hashSync(expReq.body.password, 8),
    ], (dbErr) => {
        if (dbErr) {
            expRes.status(400).send("email aready used");
            throw dbErr.message;
        }
        else
            expRes.send("success data inserted");
    });
});
auth.post("/login", (expReq, expRes) => {
    const SQL_password_hash = "SELECT id, password_hash FROM login WHERE email = ?";
    db.query(SQL_password_hash, expReq.body.email, (dbErr, dbRes) => {
        if (!dbRes.length) {
            expRes.status(400).send("email dont found");
        }
        const idToken = jsonwebtoken_1.default.sign({ id: dbRes[0].id }, process.env.PRIVATE_KEY || "", { expiresIn: "24hr" });
        bcrypt_1.default.compareSync(expReq.body.password, dbRes[0].password_hash)
            ? expRes.send(idToken)
            : expRes.status(400).send("wrong password");
    });
});
auth.post("/authenticaded", (expReq, ExpRes) => {
    jsonwebtoken_1.default.verify(expReq.body.tokenid, process.env.PRIVATE_KEY || "", ((err) => {
        if (err)
            return ExpRes.send("invalid token");
        ExpRes.status(200).send('succesful authenticated');
    }));
});
auth.post("/nick", (expReq, expRes) => {
    const SQL_id = "SELECT nickname FROM login WHERE id = ?;";
    const id = jsonwebtoken_1.default.verify(expReq.body.tokenid, process.env.PRIVATE_KEY || "");
    db.query(SQL_id, id.id, (dbErr, dbRes) => {
        if (dbErr) {
            expRes.status(500).send("invalid token");
            throw dbErr.message;
        }
        expRes.send(dbRes);
    });
});
exports.default = auth;
