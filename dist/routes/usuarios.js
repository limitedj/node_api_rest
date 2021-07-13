"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const usuarios_1 = require("../controllers/usuarios");
const router = express_1.Router();
router.get('/', usuarios_1.getUsuarios);
router.get('/:id', usuarios_1.getUsuario);
router.post('/auth', [
    express_validator_1.check('email', 'El email es obligatorio').isEmail().notEmpty(),
    express_validator_1.check('password', 'El password debe tener mas de 6 digitos').isLength({ min: 6 }),
], usuarios_1.loginUsuario);
router.post('/crear', [
    express_validator_1.check('nombre', 'El nombre es obligatorio'),
    express_validator_1.check('email', 'El email es obligatorio').normalizeEmail().isEmail().notEmpty(),
    express_validator_1.check('password', 'El password debe tener mas de 6 digitos').isLength({ min: 6 }),
], usuarios_1.crearUsuario);
router.put('/:id', usuarios_1.putUsuario);
router.delete('/:id', usuarios_1.deleteUsuario);
exports.default = router;
//# sourceMappingURL=usuarios.js.map