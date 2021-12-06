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
exports.deleteUsuariosRoles = exports.putUsuariosRoles = exports.crearUsuariosRoles = exports.getUsuarioRol = exports.getUsuariosRoles = exports.getUsuariosRolesPag = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const rol_1 = __importDefault(require("../models/rol"));
//Obtener todos los Rol paginados
const getUsuariosRolesPag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.getUsuariosRolesPag = getUsuariosRolesPag;
//Obtener todos los Rol
const getUsuariosRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rol = yield rol_1.default.findAll();
    res.json({ rol });
});
exports.getUsuariosRoles = getUsuariosRoles;
//Obtener un rol por id
const getUsuarioRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.getUsuarioRol = getUsuarioRol;
// Crear Rol
const crearUsuariosRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.crearUsuariosRoles = crearUsuariosRoles;
//Actualizar un usuario
const putUsuariosRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.putUsuariosRoles = putUsuariosRoles;
const deleteUsuariosRoles = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.deleteUsuariosRoles = deleteUsuariosRoles;
//# sourceMappingURL=rol_menu.js.map