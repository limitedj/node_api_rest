"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
//Modelo de Roles
const Usuario_rol = connection_1.default.define('usuarios_roles', {
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    // timestamps : false,
    freezeTableName: true,
    tableName: 'usuarios_roles',
});
exports.default = Usuario_rol;
//# sourceMappingURL=usuario_rol.js.map