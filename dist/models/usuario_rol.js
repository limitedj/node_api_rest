"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const usuario_1 = __importDefault(require("./usuario"));
const rol_1 = __importDefault(require("./rol"));
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
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: true,
    }
}, {
    sequelize: connection_1.default,
    paranoid: true,
    tableName: 'usuarios_roles'
});
usuario_1.default.belongsToMany(rol_1.default, { through: UsuarioRol, foreignKey: 'usuario_id' });
rol_1.default.belongsToMany(usuario_1.default, { through: UsuarioRol, foreignKey: 'rol_id' });
exports.default = UsuarioRol;
//# sourceMappingURL=usuario_rol.js.map