"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../../config"));
;
class Cargo extends sequelize_1.Model {
}
Cargo.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    codigo_cargo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    nombre_cargo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: config_1.default,
    paranoid: true,
    tableName: 'cargos'
});
exports.default = Cargo;
//# sourceMappingURL=cargo.js.map