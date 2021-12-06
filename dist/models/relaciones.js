"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const menu_1 = __importDefault(require("./menu"));
const rol_1 = __importDefault(require("./rol"));
const usuario_1 = __importDefault(require("./usuario"));
usuario_1.default.belongsToMany(rol_1.default, { through: 'Usuarios_roles' });
rol_1.default.belongsToMany(usuario_1.default, { through: 'Usuarios_roles' });
rol_1.default.belongsToMany(menu_1.default, { through: 'Roles_menus' });
menu_1.default.belongsToMany(rol_1.default, { through: 'Roles_menus' });
//# sourceMappingURL=relaciones.js.map