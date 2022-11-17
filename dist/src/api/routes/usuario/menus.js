"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const menuControler = __importStar(require("../../../api/controllers/usuarios/menus"));
const validar_campos_1 = require("../../middlewares/validar_campos");
const menuRouters = express_1.Router();
menuRouters.get('/', menuControler.getAll);
menuRouters.get('/:id', menuControler.getById);
menuRouters.post('/crear', [
    express_validator_1.check('codigo', 'El codigo es obligatorio')
        .notEmpty(),
    validar_campos_1.validarCampos,
], menuControler.create);
menuRouters.put('/:id', menuControler.updateById);
menuRouters.delete('/:id', menuControler.deleteById);
exports.default = menuRouters;
//# sourceMappingURL=menus.js.map