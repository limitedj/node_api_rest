"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./usuario/auth"));
const menus_1 = __importDefault(require("./usuario/menus"));
const menus_roles_1 = __importDefault(require("./usuario/menus_roles"));
const roles_1 = __importDefault(require("./usuario/roles"));
const usuarios_1 = __importDefault(require("./usuario/usuarios"));
const usuarios_roles_1 = __importDefault(require("./usuario/usuarios_roles"));
const pathsUsuario = {
    auth: '/auth',
    usuarios: '/usuario',
    roles: '/rol',
    menus: '/menu',
    usuarios_roles: '/usuario_rol',
    menus_roles: '/menu_rol',
};
const router = express_1.Router();
router.use(pathsUsuario.auth, auth_1.default);
router.use(pathsUsuario.menus, menus_1.default);
router.use(pathsUsuario.usuarios, usuarios_1.default);
router.use(pathsUsuario.roles, roles_1.default);
router.use(pathsUsuario.usuarios_roles, usuarios_roles_1.default);
router.use(pathsUsuario.menus_roles, menus_roles_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map