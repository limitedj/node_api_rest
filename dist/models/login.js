"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const menu_1 = __importDefault(require("./menu"));
const rol_1 = __importDefault(require("./rol"));
const usuario_1 = __importDefault(require("./usuario"));
require("./usuario_rol");
require("./rol_menu");
usuario_1.default.belongsToMany(rol_1.default, { through: 'usuarios_roles', foreignKey: 'usuario_id', });
rol_1.default.belongsToMany(usuario_1.default, { through: 'usuarios_roles', foreignKey: 'rol_id', });
rol_1.default.belongsToMany(menu_1.default, { through: 'roles_menus', foreignKey: 'rol_id' });
menu_1.default.belongsToMany(rol_1.default, { through: 'roles_menus', foreignKey: 'menu_id' });
//# sourceMappingURL=login.js.map