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
exports.esEmailValido = exports.esRolValido = void 0;
const roles_1 = __importDefault(require("../models/roles"));
const usuario_1 = __importDefault(require("../models/usuario"));
const esRolValido = (rol = '') => __awaiter(void 0, void 0, void 0, function* () {
    const existeRol = yield roles_1.default.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BD`);
    }
});
exports.esRolValido = esRolValido;
const esEmailValido = (email = '') => __awaiter(void 0, void 0, void 0, function* () {
    const existeEmail = yield usuario_1.default.findOne({ email });
    if (existeEmail) {
        throw new Error(`El email ${email} ya esta registrado en la base de datos`);
    }
});
exports.esEmailValido = esEmailValido;
// const existeEmail = await Usuario.findOne({
//     where: {
//         email: body.email
//     }
// });
// if (existeEmail) {
//     return res.status(400).json({
//         msg: 'Ya existe el usuario con el email ' + body.email
//     });
// }
//# sourceMappingURL=db-validators.js.map