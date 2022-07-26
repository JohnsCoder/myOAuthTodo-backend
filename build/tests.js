"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const id = jsonwebtoken_1.default.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODAsImlhdCI6MTY1ODc2NDgzOSwiZXhwIjoxNjU4ODUxMjM5fQ.wK8yAtuCOCshqJCzfpqKhsAiRgSysM8HQeed5mqAPGU', '12345678945867325478597642389563');
console.log(id);
