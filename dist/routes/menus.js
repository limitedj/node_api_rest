"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const menus_1 = require("../controllers/menus");
const validar_campos_1 = require("../middlewares/validar_campos");
const router = (0, express_1.Router)();
router.get('/', menus_1.getMenus);
router.get('/:id', menus_1.getMenu);
router.post('/crear', [
    (0, express_validator_1.check)('codigo', 'El codigo es obligatorio').notEmpty(),
    validar_campos_1.validarCampos,
], menus_1.crearMenu);
router.put('/:id', menus_1.putMenu);
router.delete('/:id', menus_1.deleteMenu);
exports.default = router;
//# sourceMappingURL=menus.js.map