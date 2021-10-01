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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.putUsuario = exports.crearUsuario = exports.getUsuario = exports.getUsuarios = exports.getUsuariosPag = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
//Obtener todos los Usuarios paginados
const getUsuariosPag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limite = 5, desde = 5 } = req.query;
    const usuarios = yield usuario_1.default.findAndCountAll({
        // where: {...},
        // order: [...],
        limit: Number(limite),
        offset: Number(desde)
    });
    // .then(function (result) {
    //     res.json({ usuario });
    // });    
    res.json({ usuarios });
});
exports.getUsuariosPag = getUsuariosPag;
//Obtener todos los Usuarios
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_1.default.findAll();
    res.json({ usuarios });
});
exports.getUsuarios = getUsuarios;
//Obtener un usuario por id
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByPk(id);
    if (usuario) {
        res.json({ usuario });
    }
    else {
        return res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        });
    }
});
exports.getUsuario = getUsuario;
// Crear Usuarios
const crearUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const error = validationResult(req);
    // if (!error.isEmpty()) {
    //     return res.status(400).json({
    //         ok: false,
    //         error: error.mapped()
    //     })
    // };
    const { body, headers } = req;
    const token = req.header('x-token') || '';
    const { password } = body;
    try {
        const existeEmail = yield usuario_1.default.findOne({
            where: {
                email: body.email
            }
        });
        if (existeEmail) {
            return res.status(400).json({
                msg: 'Ya existe el usuario con el email ' + body.email
            });
        }
        const salt = bcryptjs_1.default.genSaltSync();
        body.password = bcryptjs_1.default.hashSync(password, salt);
        const usuario = yield usuario_1.default.create(body);
        yield usuario.save();
        res.status(200).json({
            ok: true,
            msg: 'La actualización se realizó con éxito',
            usuario,
            token
        });
        //  res.json(usuario);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador Miguel Angel'
        });
    }
});
exports.crearUsuario = crearUsuario;
//Actualizar un usuario
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _a = req.body, { password, google, email } = _a, resto = __rest(_a, ["password", "google", "email"]);
    if (password) {
        // Encriptar la contraseña
        const salt = bcryptjs_1.default.genSaltSync();
        resto.password = bcryptjs_1.default.hashSync(password, salt);
    }
    try {
        const usuario = yield usuario_1.default.findByPk(id, resto);
        if (!usuario) {
            return res.status(404).json({
                msg: 'No existe un usuario con el id ' + id
            });
        }
        yield usuario.update(resto);
        yield usuario.save();
        res.status(200).json({
            ok: true,
            msg: 'La actualización se realizó con éxito'
        });
        // res.json(usuario);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador Update'
        });
    }
});
exports.putUsuario = putUsuario;
const deleteUsuario = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByPk(id);
    if (!usuario) {
        return res.status(400).json({
            msg: 'No existe un usuario con el id ' + id
        });
    }
    if (!usuario) {
        return res.status(400).json({
            msg: 'No existe un usuario con el id ' + id
        });
    }
    yield usuario.update({ estado: false });
    res.json(usuario);
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuarios.js.map