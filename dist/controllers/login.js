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
exports.revalidarToken = exports.login = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generarJWT_1 = __importDefault(require("../helpers/generarJWT"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Verificar si el email existe
        const usuario = yield usuario_1.default.findOne({ where: { email: email } });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }
        // Si el usuario está activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            });
        }
        // Validar contraseña
        console.log(usuario.password);
        const validPassword = bcryptjs_1.default.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password: incorrecto'
            });
        }
        //Generar el JWT
        const uid = (usuario.id).toString();
        const token = yield generarJWT_1.default(uid, usuario.nombre);
        //    console.log(usuario.password);
        res.json({
            ok: true,
            uid: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            token
        });
    }
    catch (error) {
        res.json(500).json({
            msg: 'Hable con el Administrador'
        });
    }
});
exports.login = login;
const revalidarToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req;
    // Leer la base de datos
    const usuario = yield usuario_1.default.findByPk(uid);
    // Generar el JWT
    const token = yield generarJWT_1.default(uid, usuario === null || usuario === void 0 ? void 0 : usuario.nombre);
    // const token = await generarJWT((req.uid), req.nombre);
    console.log(`${req.uid}  ${req.nombre} nuevo token generado = ${token}`);
    return res.json({
        ok: true,
        msg: 'Renew',
        uid: usuario === null || usuario === void 0 ? void 0 : usuario.id,
        nombre: usuario === null || usuario === void 0 ? void 0 : usuario.nombre,
        email: usuario === null || usuario === void 0 ? void 0 : usuario.email,
        token
    });
});
exports.revalidarToken = revalidarToken;
//# sourceMappingURL=login.js.map