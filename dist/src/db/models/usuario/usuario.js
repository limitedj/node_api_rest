"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../../config"));
;
;
class Usuario extends sequelize_1.Model {
}
Usuario.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    apellido: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    imagen: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    google: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    createdAt: { type: sequelize_1.DataTypes.DATE, allowNull: true },
    updatedAt: { type: sequelize_1.DataTypes.DATE, allowNull: true },
    deletedAt: { type: sequelize_1.DataTypes.DATE, allowNull: true }
}, {
    sequelize: config_1.default,
    paranoid: true,
    tableName: 'usuarios'
});
// export interface UsuarioInput  extends Optional<Attributes<Usuario>,'id'> {
//     // descripcion?:RolOutput[]
// };
// export interface UsuarioOutput extends Attributes<Usuario> {
//     Roles?: RolOutput[]
// };  
// export interface UsuarioShow  extends Omit<Attributes<Usuario>,'id' | 'createAt' | 'updateAT' | 'deleteAt'> {};
exports.default = Usuario;
//# sourceMappingURL=usuario.js.map