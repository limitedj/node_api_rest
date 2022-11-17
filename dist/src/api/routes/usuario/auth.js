"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../../controllers/usuarios/auth/auth");
const validar_jwt_1 = __importDefault(require("../../middlewares/validar-jwt"));
const validar_campos_1 = require("../../middlewares/validar_campos");
const authRouters = express_1.Router();
authRouters.post('/login', [
    express_validator_1.check('email', 'El email es obligatorio y/o formato de no valido').isEmail(),
    express_validator_1.check('password', 'El password es obligatorio').isLength({ min: 6 }),
    validar_campos_1.validarCampos
], auth_1.login);
authRouters.post('/login/google', [
    express_validator_1.check('token', 'El token de google es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], auth_1.googleSingIn);
authRouters.get('/renew', validar_jwt_1.default, auth_1.renewToken);
exports.default = authRouters;
//# sourceMappingURL=auth.js.map