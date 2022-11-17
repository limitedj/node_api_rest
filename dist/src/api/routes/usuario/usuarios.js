"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const usuarios_1 = require("../../controllers/usuarios/usuarios");
const validar_campos_1 = require("../../middlewares/validar_campos");
const db_validators_1 = require("../../helpers/db-validators");
const validar_jwt_1 = __importDefault(require("../../middlewares/validar-jwt"));
const validar_roles_1 = require("../../middlewares/validar-roles");
const usuarioRouters = express_1.Router();
usuarioRouters.get('/', usuarios_1.getAll);
//router.get('/',          getUsuariosPag);
usuarioRouters.get('/:id', usuarios_1.getById);
usuarioRouters.post('/crear', [
    validar_jwt_1.default,
    //    esAdminRole,
    express_validator_1.check('nombre', 'El nombre es obligatorio').notEmpty(),
    express_validator_1.check('email', 'El email es obligatorio').normalizeEmail().isEmail().notEmpty().custom(db_validators_1.existeEmail),
    express_validator_1.check('password', 'El password es obligatorio').notEmpty(),
    express_validator_1.check('password', 'El password debe tener mas de 6 digitos').isLength({ min: 6 }),
    //  check('rol','el rol no exite en la base de datos').notEmpty().custom(esRolValido),
    validar_campos_1.validarCampos
], usuarios_1.create);
//  
usuarioRouters.put('/:id', [
    // check('id').custom(existeId),    
    express_validator_1.check('rol').notEmpty().custom(db_validators_1.esRolValido),
    validar_campos_1.validarCampos
], usuarios_1.updateById);
usuarioRouters.delete('/:id', [
    validar_jwt_1.default,
    validar_roles_1.esAdminRole,
    express_validator_1.check('id', 'no es un id valido').notEmpty(),
    express_validator_1.check('id').custom(db_validators_1.exiteUsuarioPorId),
    validar_campos_1.validarCampos
], usuarios_1.deleteById);
exports.default = usuarioRouters;
//# sourceMappingURL=usuarios.js.map