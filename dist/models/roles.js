"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
//Modelo de Roles
const Role = connection_1.default.define('role', {
    codigo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    id_menu: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    }
});
exports.default = Role;
//# sourceMappingURL=roles.js.map