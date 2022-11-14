"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import dotenv from 'dotenv';
const src_1 = __importDefault(require("./src"));
//  dotenv.config();
const server = new src_1.default();
server.listen();
// console.log('VARIABLE GLOBAL DE app' + ' ' + process.env.DB_SERVER + ' ' + process.env.DB_DIALECT);
//# sourceMappingURL=app.js.map