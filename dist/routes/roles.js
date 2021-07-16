"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const usuarios_1 = require("../controllers/usuarios");
const validar_campos_1 = require("../middlewares/validar_campos");
const role_1 = __importDefault(require("../models/role"));
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
    express_validator_1.check('email', 'El email es obligatorio').normalizeEmail().isEmail().notEmpty(),
    express_validator_1.check('password', 'El password es obligatorio').notEmpty(),
    express_validator_1.check('password', 'El password debe tener mas de 6 digitos').isLength({ min: 6 }),
    express_validator_1.check('id').custom((id = '') => __awaiter(void 0, void 0, void 0, function* () {
        const existeRol = yield role_1.default.findByPk(id);
        if (!existeRol) {
            throw new Error(`El rol ${id} no está registrado en la BD`);
        }
    })),
    validar_campos_1.validarCampos,
], usuarios_1.crearUsuario);
router.put('/:id', usuarios_1.putUsuario);
router.delete('/:id', usuarios_1.deleteUsuario);
exports.default = router;
//# sourceMappingURL=roles.js.map