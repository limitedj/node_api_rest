"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
//Modelo de Roles
const Rol = connection_1.default.define('roles', {
    codigo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
}, {
    // timestamps : false,
    freezeTableName: true,
    tableName: 'roles',
});
// Rol.belongsToMany(Usuario, {through:'Usuario_rol', foreignKey: 'rol_id'});
exports.default = Rol;
//# sourceMappingURL=rol.js.map