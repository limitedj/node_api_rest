"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../../config"));
;
;
class MenuRol extends sequelize_1.Model {
}
MenuRol.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    menu_id: {
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
    tableName: 'menus_roles'
});
exports.default = MenuRol;
// import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, Attributes, Optional } from 'sequelize';
// import Rol from "./rol";
// import Menu from './menu';
// import db from "../../config";
// class MenuRol extends Model<InferAttributes<MenuRol>, InferCreationAttributes<MenuRol>> {
//     declare id: CreationOptional<BigInt>
//     declare menu_id: bigint
//     declare rol_id: bigint
//     declare estado: boolean
//     // timestamps!
// // createdAt can be undefined during creation
// declare readonly createdAt : CreationOptional<Date>;
// // updatedAt can be undefined during creation
// declare readonly updatedAt : CreationOptional<Date>;
// // deleteAt can be undefined during creation        
// declare readonly deletedAt : CreationOptional<Date>;
// }
// MenuRol.init({
//     id:{
//         type:DataTypes.BIGINT,
//         autoIncrement: true,
//         primaryKey: true,
//     },
//     menu_id:{
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
//     tableName:'menus_roles'
// });
// export interface MenuRolInput extends Optional<Attributes<MenuRol>, 'id'> {};
// export interface MenuRolOutput extends Attributes<MenuRol> {};
// export default MenuRol;
//# sourceMappingURL=menu_rol.js.map