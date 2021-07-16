"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const connection_1 = __importDefault(require("../db/connection"));
//Modelo de Usuarios
const Usuario = connection_1.default.define('usuario', {
    nombre: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_typescript_1.DataType.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    },
    imagen: {
        type: sequelize_typescript_1.DataType.STRING,
    },
    rol: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    },
    estado: {
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: true
    },
    google: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true
    }
});
exports.default = Usuario;
//# sourceMappingURL=usuario.js.map