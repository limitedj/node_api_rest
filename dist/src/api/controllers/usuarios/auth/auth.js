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
exports.googleSingIn = exports.renewToken = exports.login = void 0;
// import Usuario from '../../../db/models'; 
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generarJWT_1 = __importDefault(require("../../../helpers/generarJWT"));
const usuario_1 = require("../../../../db/models/usuario");
const google_verify_1 = __importDefault(require("../../../helpers/google.verify"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Verificar si el email existe
        const usuario = yield usuario_1.Usuario.findOne({ where: { email: email } });
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
const renewToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req;
    // Leer la base de datos
    const usuario = yield usuario_1.Usuario.findByPk(uid);
    // Generar el JWT
    const token = yield generarJWT_1.default(uid, usuario === null || usuario === void 0 ? void 0 : usuario.nombre);
    console.log(`${req.uid}  ${req.nombre} nuevo token generado = ${token}`);
    if (usuario) {
        return res.json({
            ok: true,
            token,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            email: usuario.email,
            imagen: usuario.imagen,
            google: usuario.google,
            id: usuario.id
        });
    }
});
exports.renewToken = renewToken;
const googleSingIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const googleToken = req.body.token;
    console.log(` ESTE ES GOOGLE TOKEN "${googleToken}"`);
    // console.log( JSON.stringify({ token : req.body.token }));
    try {
        const { name, email, picture } = yield google_verify_1.default(googleToken);
        // verificar si ya existe el email
        console.log(name, email, picture);
        const usuarioDB = yield usuario_1.Usuario.findOne({
            where: {
                email: email
            }
        });
        let usuario;
        if (!usuarioDB) {
            // si no existe un usuario
            usuario = new usuario_1.Usuario({
                nombre: name,
                apellido: '',
                email,
                password: '@@@',
                imagen: picture,
                google: true,
                estado: true,
            });
            console.log('no existe en la base de datos');
        }
        else {
            // existe usuario
            usuario = usuarioDB;
            usuario.google = true;
            usuario.password = '@@@';
            console.log('ya existe en la base de datos');
        }
        yield usuario.save().catch((error) => console.log(error));
        const uid = (usuario.id).toString();
        const token = yield generarJWT_1.default(uid, name);
        res.json({
            ok: true,
            token
        });
    }
    catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
});
exports.googleSingIn = googleSingIn;
//# sourceMappingURL=auth.js.map