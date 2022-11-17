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
exports.getAll = exports.deleteById = exports.getById = exports.update = exports.findOrCreate = exports.create = void 0;
const sequelize_1 = require("sequelize");
const models_1 = require("../../models");
const models_2 = require("../../models/");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // const existeEmail = await Usuario.findOne({
    //             where: {
    //                 email: payload.email
    //             }
    //         })
    //         if (existeEmail) {
    //             // @todo throw custom error
    //             throw new Error(`El email ${payload.email} ya esta registrado en la base de datos`);
    //         }
    const salt = bcryptjs_1.default.genSaltSync();
    payload.password = bcryptjs_1.default.hashSync(payload.password, salt);
    const usuario = yield models_1.Usuario.create(payload);
    return usuario;
});
exports.create = create;
const findOrCreate = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const [usuario] = yield models_1.Usuario.findOrCreate({
        where: {
            nombre: payload.nombre
        },
        defaults: payload
    });
    return usuario;
});
exports.findOrCreate = findOrCreate;
const update = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield models_1.Usuario.findByPk(id);
    if (!usuario) {
        // @todo throw custom error
        throw new Error('usuario no encontrado');
    }
    if (payload.password) {
        // Encriptar la contraseña
        const salt = bcryptjs_1.default.genSaltSync();
        payload.password = bcryptjs_1.default.hashSync(payload.password, salt);
    }
    const updatedUsuario = yield usuario.update(payload);
    return updatedUsuario;
});
exports.update = update;
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield models_1.Usuario.findByPk(id);
    if (!usuario) {
        // @todo throw custom error
        throw new Error('not found');
    }
    return usuario;
});
exports.getById = getById;
const deleteById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedUsuarioCount = yield models_1.Usuario.destroy({
        where: { id }
    });
    return !!deletedUsuarioCount;
});
exports.deleteById = deleteById;
const getAll = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    return models_1.Usuario.findAll(Object.assign({ include: [{ model: models_2.Rol, attributes: ['id', 'descripcion'] }], where: Object.assign({}, ((filters === null || filters === void 0 ? void 0 : filters.isDeleted) && { deletedAt: { [sequelize_1.Op.not]: null } })) }, (((filters === null || filters === void 0 ? void 0 : filters.isDeleted) || (filters === null || filters === void 0 ? void 0 : filters.includeDeleted)) && { paranoid: true })));
});
exports.getAll = getAll;
// export const checkSlugExists = async (slug: string): Promise<boolean> => {
//     const usuarioWithSlug = await Usuario.findOne({
//         where: {
//             slug
//         }
//     });
//     return !isEmpty(usuarioWithSlug)
// 
// }
//# sourceMappingURL=usuario.dal.js.map