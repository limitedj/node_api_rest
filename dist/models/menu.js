"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Menu = connection_1.default.define('menus', {
    codigo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    url: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
});
exports.default = Menu;
// id integer GENERATED ALWAYS AS IDENTITY NOT NULL,
// codigo character varying NOT NULL,
// menu_id integer,
// url character varying,
//# sourceMappingURL=menu.js.map