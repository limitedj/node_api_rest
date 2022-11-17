"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const menus_roles_1 = require("../../controllers/usuarios/menus_roles");
const menuRolRouters = express_1.Router();
menuRolRouters.get('/', menus_roles_1.getAll);
menuRolRouters.get('/:id', menus_roles_1.getById);
// menuRolRouters.post('/crear',[
//        check('codigo','El codigo es obligatorio').notEmpty(),
//        validarCampos,
//        ],
//        crearMenuRol);
// menuRolRouters.put('/:id', putMenuRol);
// menuRolRouters.delete('/:id', deleteMenuRol);
exports.default = menuRolRouters;
//# sourceMappingURL=menus_roles.js.map