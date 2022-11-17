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
exports.deleteById = exports.updateById = exports.create = exports.getById = exports.getAll = exports.getAllShort = exports.getAllPag = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const models_1 = require("../../../../db/models");
//Obtener todos los Rol paginados
const getAllPag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limite = 5, desde = 5 } = req.query;
    const roles = yield models_1.Rol.findAndCountAll({
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
exports.getAllPag = getAllPag;
//Obtener todos los Rol
const getAllShort = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rol = yield models_1.Rol.findAll({ attributes: ['id', 'codigo'] });
    // const rol = await Rol.findAll();
    res.json(rol);
});
exports.getAllShort = getAllShort;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rol = yield models_1.Rol.findAll();
    res.json({ rol, ok: true, });
});
exports.getAll = getAll;
//Obtener un rol por id
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const rol = yield models_1.Rol.findByPk(id);
    if (rol) {
        res.json({ rol });
    }
    else {
        return res.status(404).json({
            msg: `No existe un rol con el id ${id}`
        });
    }
});
exports.getById = getById;
// Crear Rol
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const error = validationResult(req);
    // if (!error.isEmpty()) {
    //     return res.status(400).json({
    //         ok: false,
    //         error: error.mapped()
    //     })
    // };
    const { body, headers } = req;
    const token = req.header('x-token') || '';
    const { codigo, descripcion } = body;
    try {
        const existeRol = yield models_1.Rol.findOne({
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
        const rol = yield models_1.Rol.create(body);
        // await rol.save();
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
exports.create = create;
//Actualizar un usuario
const updateById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _a = req.body, { password, google, email } = _a, resto = __rest(_a, ["password", "google", "email"]);
    if (password) {
        // Encriptar la contraseña
        const salt = bcryptjs_1.default.genSaltSync();
        resto.password = bcryptjs_1.default.hashSync(password, salt);
    }
    try {
        const rol = yield models_1.Rol.findByPk(id, resto);
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
exports.updateById = updateById;
const deleteById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const rol = yield models_1.Rol.findByPk(id);
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
exports.deleteById = deleteById;
// import { Rol } from '../../interfaces'
// import * as mapper from './mapper'
// import * as service from '../../../db/services/service.rol'
// import { GetAllRolesFilters } from '../../../db/models/types';
// import { CreateRolDTO, UpdateRolDTO } from '../../dto/rol.dot';
// export const create = async (payload: CreateRolDTO): Promise<Rol> => {
//     return mapper.toRol(await service.create(payload))
// }
// export const updateById = async (id: number, payload: UpdateRolDTO): Promise<Rol> => {
//     return mapper.toRol(await service.update(id, payload))
// }
// export const getById = async (id: number): Promise<Rol> => {
//     return mapper.toRol(await service.getById(id))
// }
// export const deleteById = (id: number): Promise<boolean> => {
//     return service.deleteById(id)
// }
// export const getAll = async (filters: GetAllRolesFilters): Promise<Rol[]> => {
//     return (await service.getAll(filters)).map(mapper.toRol)
// }
// export const getAllShort = async (filters: GetAllRolesFilters): Promise<Rol[]> => {
//     return (await service.getAll(filters)).map(mapper.toRol)
// }
//# sourceMappingURL=rol.ejemplo.js.map