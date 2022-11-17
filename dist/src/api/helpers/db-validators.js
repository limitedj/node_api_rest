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
exports.exiteUsuarioPorId = exports.existeId = exports.existeEmail = exports.esRolValido = void 0;
const usuario_1 = __importDefault(require("../../db/models/usuario/usuario"));
const rol_1 = __importDefault(require("../../db/models/usuario/rol"));
const esRolValido = (rol = '') => __awaiter(void 0, void 0, void 0, function* () {
    const existeRol = yield rol_1.default.findOne({ where: { codigo: rol } });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BD`);
    }
});
exports.esRolValido = esRolValido;
const existeEmail = (email = '') => __awaiter(void 0, void 0, void 0, function* () {
    const existeEmail = yield usuario_1.default.findOne({ where: { email: email } });
    if (existeEmail) {
        throw new Error(`El email ${email} ya esta registrado en la base de datos`);
    }
});
exports.existeEmail = existeEmail;
const existeId = (id = 0) => __awaiter(void 0, void 0, void 0, function* () {
    const existeId = yield usuario_1.default.findOne({ where: { id: id } });
    if (existeId) {
        throw new Error(`El id ${id} ya esta registrado en la base de datos`);
    }
});
exports.existeId = existeId;
const exiteUsuarioPorId = (id = 0) => __awaiter(void 0, void 0, void 0, function* () {
    const existeId = yield usuario_1.default.findOne({ where: { id: id } });
    if (!existeId) {
        throw new Error(`El usuario con el id ${id} no existe en la base de datos`);
    }
});
exports.exiteUsuarioPorId = exiteUsuarioPorId;
//# sourceMappingURL=db-validators.js.map