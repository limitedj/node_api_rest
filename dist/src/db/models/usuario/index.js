"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuRol = exports.UsuarioRol = exports.Usuario = exports.Rol = exports.Menu = void 0;
const menu_1 = __importDefault(require("./menu"));
exports.Menu = menu_1.default;
const rol_1 = __importDefault(require("./rol"));
exports.Rol = rol_1.default;
const usuario_1 = __importDefault(require("./usuario"));
exports.Usuario = usuario_1.default;
const usuario_rol_1 = __importDefault(require("./usuario_rol"));
exports.UsuarioRol = usuario_rol_1.default;
const menu_rol_1 = __importDefault(require("./menu_rol"));
exports.MenuRol = menu_rol_1.default;
// Asociacion usuario Rol
rol_1.default.belongsToMany(usuario_1.default, {
    through: usuario_rol_1.default,
    foreignKey: 'rol_id'
});
usuario_1.default.belongsToMany(rol_1.default, {
    through: usuario_rol_1.default,
    foreignKey: 'usuario_id'
});
// Asociacion Menu Rol
menu_1.default.belongsToMany(rol_1.default, {
    through: menu_rol_1.default,
    foreignKey: 'menu_id'
});
rol_1.default.belongsToMany(menu_1.default, {
    through: menu_rol_1.default,
    foreignKey: 'rol_id'
});
//# sourceMappingURL=index.js.map