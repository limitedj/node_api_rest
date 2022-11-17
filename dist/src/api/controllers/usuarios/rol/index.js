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
exports.deleteById = exports.getById = exports.create = exports.updateById = exports.getAll = void 0;
const mapper = __importStar(require("./mapper"));
const service = __importStar(require("../../../../db/services/usuario/service.rol"));
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = req.query;
    const results = (yield service.getAll(filters)).map(mapper.toRol);
    return res.status(200).send(results);
});
exports.getAll = getAll;
const updateById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const payload = req.body;
    return mapper.toRol(yield service.update(id, payload));
});
exports.updateById = updateById;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const results = mapper.toRol(yield service.create(payload));
    return res.status(200).send(results);
});
exports.create = create;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    return mapper.toRol(yield service.getById(id));
});
exports.getById = getById;
const deleteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    return service.deleteById(id);
});
exports.deleteById = deleteById;
//# sourceMappingURL=index.js.map