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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = exports.getById = exports.deleteById = exports.update = exports.findOrCreate = exports.create = void 0;
const sequelize_1 = require("sequelize");
const models_1 = require("../../models");
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const menu = yield models_1.Menu.create(payload);
    return menu;
});
exports.create = create;
const findOrCreate = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const [menu] = yield models_1.Menu.findOrCreate({
        where: {
            codigo: payload.codigo
        },
        defaults: payload
    });
    return menu;
});
exports.findOrCreate = findOrCreate;
const update = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const menu = yield models_1.Menu.findByPk(id);
    if (!menu) {
        // @todo throw custom error
        throw new Error('not found');
    }
    const updatedMenu = yield menu.update(payload);
    return updatedMenu;
});
exports.update = update;
const deleteById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedMenuCount = yield models_1.Menu.destroy({
        where: { id }
    });
    return !!deletedMenuCount;
});
exports.deleteById = deleteById;
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const menu = yield models_1.Menu.findByPk(id);
    if (!menu) {
        // @todo throw custom error
        throw new Error('Menú inexistente');
    }
    return menu;
});
exports.getById = getById;
const getAll = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(`Paso por el DAL isDeleted ${filters?.isDeleted} includeDeleted ${filters?.includeDeleted}`);
    return models_1.Menu.findAll(Object.assign({ where: Object.assign({}, ((filters === null || filters === void 0 ? void 0 : filters.isDeleted) && { deletedAt: { [sequelize_1.Op.not]: null } })) }, (((filters === null || filters === void 0 ? void 0 : filters.isDeleted) || (filters === null || filters === void 0 ? void 0 : filters.includeDeleted)) && { paranoid: true })));
});
exports.getAll = getAll;
//# sourceMappingURL=menu.dal.js.map