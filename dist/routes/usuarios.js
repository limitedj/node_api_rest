"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const usuarios_1 = require("../controllers/usuarios");
const validar_campos_1 = require("../middlewares/validar_campos");
const db_validators_1 = require("../helpers/db-validators");
const router = express_1.Router();
router.get('/', usuarios_1.getUsuarios);
router.get('/:id', usuarios_1.getUsuario);
router.post('/auth', [
    express_validator_1.check('email', 'El email es obligatorio').isEmail().notEmpty(),
    express_validator_1.check('password', 'El password debe tener mas de 6 digitos').isLength({ min: 6 }),
    validar_campos_1.validarCampos,
], usuarios_1.loginUsuario);
router.post('/crear', [
    express_validator_1.check('nombre', 'El nombre es obligatorio').notEmpty(),
    //    check('email','El email es obligatorio').normalizeEmail().isEmail().notEmpty(),
    express_validator_1.check('password', 'El password es obligatorio').notEmpty(),
    express_validator_1.check('password', 'El password debe tener mas de 6 digitos').isLength({ min: 6 }),
    express_validator_1.check('rol').notEmpty().custom(db_validators_1.esRolValido),
    express_validator_1.check('email').notEmpty().custom(db_validators_1.existeEmail).isEmail(),
    validar_campos_1.validarCampos,
], usuarios_1.crearUsuario);
router.put('/:id', usuarios_1.putUsuario);
router.delete('/:id', usuarios_1.deleteUsuario);
exports.default = router;
//# sourceMappingURL=usuarios.js.map