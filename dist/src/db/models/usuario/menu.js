"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../../config"));
;
;
class Menu extends sequelize_1.Model {
}
Menu.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    codigo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    estado: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: true,
    },
    createdAt: { type: sequelize_1.DataTypes.DATE, allowNull: true },
    updatedAt: { type: sequelize_1.DataTypes.DATE, allowNull: true },
    deletedAt: { type: sequelize_1.DataTypes.DATE, allowNull: true }
}, {
    sequelize: config_1.default,
    paranoid: true,
    tableName: 'menus'
});
exports.default = Menu;
// import { Mode } from "fs";
// import { DataTypes, Model, InferAttributes, Attributes, InferCreationAttributes, CreationOptional,Optional} from "sequelize";
// import db from "../../config";
// class Menu extends Model<InferAttributes<Menu>, InferCreationAttributes<Menu>> {
//         declare id: CreationOptional<BigInt>;
//         declare codigo: string;
//         declare descripcion: string;
//         declare estado: boolean;
//         // timestamps!
// // createdAt can be undefined during creation
//         declare readonly createdAt : CreationOptional<Date>;
// // updatedAt can be undefined during creation
//         declare readonly updatedAt : CreationOptional<Date>;
// // deleteAt can be undefined during creation        
//         declare readonly deletedAt : CreationOptional<Date>;
//     }
//     Menu.init({
//         id:{
//         type:DataTypes.BIGINT,
//         autoIncrement: true,
//         primaryKey: true,
//     },
//     codigo: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     descripcion: {
//         type: DataTypes.STRING,
//         allowNull: true,
//     },
//     estado: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         defaultValue: true,
//     },
//     createdAt: {type: DataTypes.DATE, allowNull: true},
//     updatedAt: {type: DataTypes.DATE, allowNull: true},
//     deletedAt: {type: DataTypes.DATE, allowNull: true}
// },{
//     sequelize: db,
//     paranoid: true,
//     tableName: 'menus'
// });
// export interface MenuInput extends Optional<Attributes<Menu>, 'id'> {};
// // Model<InferAttributes<Menu>> {};
// export interface MenuOutput extends Attributes<Menu> {};
// export default Menu;
//# sourceMappingURL=menu.js.map