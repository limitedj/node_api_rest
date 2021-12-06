"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../controllers/auth");
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
const validar_campos_1 = require("../middlewares/validar_campos");
const router = express_1.Router();
router.post('/login', [
    express_validator_1.check('email', 'El email es obligatorio y/o formato de no valido').isEmail(),
    // check('password','El password es obligatorio').isLength({min:6}),
    validar_campos_1.validarCampos
], auth_1.login);
router.get('/renew', validar_jwt_1.default, auth_1.revalidarToken);
exports.default = router;
//# sourceMappingURL=autenticacion.js.map