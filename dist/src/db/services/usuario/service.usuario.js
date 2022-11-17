"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = exports.deleteById = exports.getById = exports.update = exports.create = void 0;
const lodash_1 = require("lodash");
const usuarioDal = __importStar(require("../../../db/dal/usuario/usuario.dal"));
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    let slug = lodash_1.kebabCase(payload.nombre);
    // const slugExists = await usuarioDal.checkSlugExists(slug)
    // payload.email = emailExists ? `${slug}-${Math.floor(Math.random() * 1000)}` : slug
    return usuarioDal.create(payload);
});
exports.create = create;
const update = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.nombre) {
        let slug = lodash_1.kebabCase(payload.nombre);
        // const slugExists = await usuarioDal.checkSlugExists(slug)
        // payload.slug = slugExists ? `${slug}-${Math.floor(Math.random() * 1000)}` : slug
    }
    return usuarioDal.update(id, payload);
});
exports.update = update;
const getById = (id) => {
    return usuarioDal.getById(id);
};
exports.getById = getById;
const deleteById = (id) => {
    return usuarioDal.deleteById(id);
};
exports.deleteById = deleteById;
const getAll = (filters) => {
    return usuarioDal.getAll(filters);
};
exports.getAll = getAll;
//# sourceMappingURL=service.usuario.js.map