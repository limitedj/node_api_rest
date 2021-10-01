"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Usuario = connection_1.default.define('usuario', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    imagen: {
        type: sequelize_1.DataTypes.STRING,
    },
    rol: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    },
    google: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true
    }
}
//{
// timestamps : false,
//freezeTableName : true,  //How to make Sequelize use singular table names
//tableName : 'usuarios',
//}
);
// export interface UsuarioInput extends Optional<UsuarioInstance, 'id' > {};
// export interface UsuarioOuput extends Required<UsuarioInstance> {};
// Usuario.prototype.usuario = function() {
//     const { id, email, password, ...usuario } = this.prototype();
//     usuario.uid = id;
//     return usuario;
// }
exports.default = Usuario;
//# sourceMappingURL=usuario.js.map