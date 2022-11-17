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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usuario_1 = __importDefault(require("../../db/models/usuario/usuario"));
const validarJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('x-token') || '';
    console.log(`Aqui debe mostrar el toKen = ${token}`);
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: `error en el token (validar JWT)`
        });
    }
    try {
        const { uid, nombre } = jsonwebtoken_1.default.verify(token, process.env.SECRETORPRIVATEKEY);
        req.uid = uid;
        req.nombre = nombre;
        console.log(uid, nombre);
        const usuario = yield usuario_1.default.findByPk(uid);
        //Verificar si el usuario que solicita el servicio existe en la BD
        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe en la BD'
            });
        }
        // Verificar si el uid tiene estado en true
        if (!(usuario === null || usuario === void 0 ? void 0 : usuario.estado)) {
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado false'
            });
        }
        next();
    }
    catch (error) {
        return res.status(401).json({
            msg: 'Token no válido'
        });
    }
    // TODO OK!
});
exports.default = validarJWT;
//# sourceMappingURL=validar-jwt.js.map