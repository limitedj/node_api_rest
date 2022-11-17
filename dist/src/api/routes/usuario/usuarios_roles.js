"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_rol_1 = require("../../controllers/usuarios/usuario_rol");
const usuarioRolrouters = express_1.Router();
usuarioRolrouters.get('/', usuario_rol_1.getUsuariosRoles);
usuarioRolrouters.get('/:id', usuario_rol_1.getUsuarioRol);
// router.post('/crear',[
//        check('usuario_id','El usuario_id es obligatorio').notEmpty(),
//        check('rol_id','el rol_id es obligatorio').notEmpty(),
//        validarCampos,
//        ],
//        crearUsuariosRoles);
// router.put('/:id', putUsuariosRoles);
// router.delete('/:id', deleteUsuariosRoles);
exports.default = usuarioRolrouters;
//# sourceMappingURL=usuarios_roles.js.map