"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db = new sequelize_1.Sequelize(process.env.DB_NOMBRE, process.env.DB_USER, process.env.DB_PASSWORD, { host: process.env.DB_SERVER,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    //logging: false
});
exports.default = db;
//# sourceMappingURL=connection.js.map