"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../../config"));
;
;
// class Rol extends Model<InferAttributes<Rol, { omit: 'name' | 'projects' }>, InferCreationAttributes<Rol>> {
// class Rol extends Model<RolAttributes, RolInput> {
class Rol extends sequelize_1.Model {
    ;
}
Rol.init({
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
        allowNull: false,
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
    tableName: 'roles'
});
exports.default = Rol;
//-------
//# sourceMappingURL=rol.js.map