"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validar_campos_1 = require("../middlewares/validar_campos");
const usuarios_roles_1 = require("../controllers/usuarios_roles");
const router = (0, express_1.Router)();
router.get('/', usuarios_roles_1.getUsuariosRoles);
router.get('/:id', usuarios_roles_1.getUsuarioRol);
router.post('/crear', [
    (0, express_validator_1.check)('usuario_id', 'El usuario_id es obligatorio').notEmpty(),
    (0, express_validator_1.check)('rol_id', 'el rol_id es obligatorio').notEmpty(),
    validar_campos_1.validarCampos,
], usuarios_roles_1.crearUsuariosRoles);
router.put('/:id', usuarios_roles_1.putUsuariosRoles);
router.delete('/:id', usuarios_roles_1.deleteUsuariosRoles);
exports.default = router;
//# sourceMappingURL=usuarios_roles.js.map