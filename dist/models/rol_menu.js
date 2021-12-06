"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
//Modelo de Roles
const Rol_menu = connection_1.default.define('roles_menus', {
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    // timestamps : false,
    freezeTableName: true,
    tableName: 'roles_menus',
});
exports.default = Rol_menu;
//# sourceMappingURL=rol_menu.js.map