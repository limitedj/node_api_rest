"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../../config"));
;
;
class UsuarioRol extends sequelize_1.Model {
}
UsuarioRol.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    usuario_id: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
    },
    rol_id: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    },
    createdAt: { type: sequelize_1.DataTypes.DATE, allowNull: true },
    updatedAt: { type: sequelize_1.DataTypes.DATE, allowNull: true },
    deletedAt: { type: sequelize_1.DataTypes.DATE, allowNull: true }
}, {
    sequelize: config_1.default,
    paranoid: true,
    tableName: 'usuarios_roles'
});
exports.default = UsuarioRol;
// import {  DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, Attributes, Optional } 
// from "sequelize";
// import db from "../../config";
// class UsuarioRol extends Model<InferAttributes<UsuarioRol>, InferCreationAttributes<UsuarioRol>> {
//     declare id: CreationOptional<BigInt>;
//     declare usuario_id: number;
//     declare rol_id: number;
//     declare estado: boolean;
//     // timestamps!
//     // createdAt can be undefined during creation
//     declare readonly createdAt : CreationOptional<Date>;
//     declare readonly updatedAt : CreationOptional<Date>;
//     // updatedAt can be undefined during creation
//     declare readonly deletedAt : CreationOptional<Date>;
//     // deleteAt can be undefined during creation        
// }
// UsuarioRol.init({
//     id:{
//         type:DataTypes.BIGINT,
//         autoIncrement: true,
//         primaryKey: true,
//     },
//     usuario_id:{
//         type: DataTypes.BIGINT,
//         allowNull: false,
//     },
//     rol_id: {
//         type: DataTypes.BIGINT,
//         allowNull: false,
//     },
//     estado: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: true,
//     },
//     createdAt: {type: DataTypes.DATE, allowNull: true},
//     updatedAt: {type: DataTypes.DATE, allowNull: true},
//     deletedAt: {type: DataTypes.DATE, allowNull: true}
// },{
//     sequelize: db,
//     paranoid:true,
//     tableName:'usuarios_roles'
// });
// export interface UsuarioRolInput extends Optional<Attributes<UsuarioRol>, 'id'> {};
// export interface UsuarioRolOutput extends Attributes<UsuarioRol> {};
// export default UsuarioRol;
//# sourceMappingURL=usuario_rol.js.map