"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const roles_1 = require("../controllers/roles");
const validar_campos_1 = require("../middlewares/validar_campos");
const router = (0, express_1.Router)();
router.get('/', roles_1.getRoles);
router.get('/:id', roles_1.getRol);
router.post('/crear', [
    (0, express_validator_1.check)('codigo', 'El codigo es obligatorio').notEmpty(),
    validar_campos_1.validarCampos,
], roles_1.crearRol);
router.put('/:id', roles_1.putRol);
router.delete('/:id', roles_1.deleteRol);
exports.default = router;
//# sourceMappingURL=roles_menus.js.map