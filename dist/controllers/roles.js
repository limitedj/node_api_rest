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
exports.deleteRol = exports.putRol = exports.crearRol = exports.getRol = exports.getRoles = exports.getSmallRoles = exports.getRolPag = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const rol_1 = __importDefault(require("../models/rol"));
//Obtener todos los Rol paginados
const getRolPag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limite = 5, desde = 5 } = req.query;
    const roles = yield rol_1.default.findAndCountAll({
        // where: {...},
        // order: [...],
        limit: Number(limite),
        offset: Number(desde)
    });
    // .then(function (result) {
    //     res.json({ rol });
    // });    
    res.json({ roles });
});
exports.getRolPag = getRolPag;
//Obtener todos los Rol
const getSmallRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rol = yield rol_1.default.findAll({ attributes: ['id', 'codigo'] });
    // const rol = await Rol.findAll();
    res.json(rol);
});
exports.getSmallRoles = getSmallRoles;
const getRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rol = yield rol_1.default.findAll();
    res.json({ rol, ok: true, });
});
exports.getRoles = getRoles;
//Obtener un rol por id
const getRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const rol = yield rol_1.default.findByPk(id);
    if (rol) {
        res.json({ rol });
    }
    else {
        return res.status(404).json({
            msg: `No existe un rol con el id ${id}`
        });
    }
});
exports.getRol = getRol;
// Crear Rol
const crearRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const existeRol = yield rol_1.default.findOne({
            where: {
                codigo: body.codigo
            }
        });
        if (existeRol) {
            return res.status(400).json({
                msg: 'Ya existe el rol con el codigo ' + body.codigo
            });
        }
        // const salt = bcryptjs.genSaltSync();
        // body.password = bcryptjs.hashSync(password, salt);
        const rol = yield rol_1.default.create(body);
        yield rol.save();
        res.status(200).json({
            ok: true,
            msg: 'El rol se creo con éxito',
            rol,
            token
        });
        //  res.json(usuario);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el Administrador'
        });
    }
});
exports.crearRol = crearRol;
//Actualizar un usuario
const putRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _a = req.body, { password, google, email } = _a, resto = __rest(_a, ["password", "google", "email"]);
    if (password) {
        // Encriptar la contraseña
        const salt = bcryptjs_1.default.genSaltSync();
        resto.password = bcryptjs_1.default.hashSync(password, salt);
    }
    try {
        const rol = yield rol_1.default.findByPk(id, resto);
        if (!rol) {
            return res.status(404).json({
                msg: 'No existe un usuario con el id ' + id
            });
        }
        yield rol.update(resto);
        yield rol.save();
        res.status(200).json({
            ok: true,
            msg: 'La actualización se realizó con éxito'
        });
        // res.json(Rol);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador Update'
        });
    }
});
exports.putRol = putRol;
const deleteRol = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const rol = yield rol_1.default.findByPk(id);
    if (!rol) {
        return res.status(400).json({
            msg: 'No existe un rol con el id ' + id
        });
    }
    if (!rol) {
        return res.status(400).json({
            msg: 'No existe un rol con el id ' + id
        });
    }
    yield rol.update({ estado: false });
    res.json(rol);
});
exports.deleteRol = deleteRol;
//# sourceMappingURL=roles.js.map