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
exports.deleteMenu = exports.putMenu = exports.crearMenu = exports.getMenu = exports.getMenus = exports.getMenusPag = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const menu_1 = __importDefault(require("../models/menu"));
//Obtener todos los Menus paginados
const getMenusPag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limite = 5, desde = 5 } = req.query;
    const menus = yield menu_1.default.findAndCountAll({
        // where: {...},
        // order: [...],
        limit: Number(limite),
        offset: Number(desde)
    });
    // .then(function (result) {
    //     res.json({ Menus });
    // });    
    res.json({ menus });
});
exports.getMenusPag = getMenusPag;
//Obtener todos los Menus
const getMenus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const menus = yield menu_1.default.findAll();
    res.json({ menus });
});
exports.getMenus = getMenus;
//Obtener un Menus por id
const getMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const menus = yield menu_1.default.findByPk(id);
    if (menus) {
        res.json({ menus });
    }
    else {
        return res.status(404).json({
            msg: `No existe un menu con el id ${id}`
        });
    }
});
exports.getMenu = getMenu;
// Crear Menu
const crearMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const existeMenu = yield menu_1.default.findOne({
            where: {
                codigo: body.codigo
            }
        });
        if (existeMenu) {
            return res.status(400).json({
                msg: 'Ya existe el menu con el codigo ' + body.codigo
            });
        }
        // const salt = bcryptjs.genSaltSync();
        // body.password = bcryptjs.hashSync(password, salt);
        const menu = yield menu_1.default.create(body);
        yield menu.save();
        res.status(200).json({
            ok: true,
            msg: 'El menu se creo con éxito',
            menu,
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
exports.crearMenu = crearMenu;
//Actualizar un usuario
const putMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _a = req.body, { password, google, email } = _a, resto = __rest(_a, ["password", "google", "email"]);
    if (password) {
        // Encriptar la contraseña
        const salt = bcryptjs_1.default.genSaltSync();
        resto.password = bcryptjs_1.default.hashSync(password, salt);
    }
    try {
        const menu = yield menu_1.default.findByPk(id, resto);
        if (!menu) {
            return res.status(404).json({
                msg: 'No existe un usuario con el id ' + id
            });
        }
        yield menu.update(resto);
        yield menu.save();
        res.status(200).json({
            ok: true,
            msg: 'La actualización se realizó con éxito'
        });
        // res.json(Menu);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador Update'
        });
    }
});
exports.putMenu = putMenu;
const deleteMenu = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const menu = yield menu_1.default.findByPk(id);
    if (!menu) {
        return res.status(400).json({
            msg: 'No existe un menu con el id ' + id
        });
    }
    if (!menu) {
        return res.status(400).json({
            msg: 'No existe un menu con el id ' + id
        });
    }
    yield menu.update({ estado: false });
    res.json(menu);
});
exports.deleteMenu = deleteMenu;
//# sourceMappingURL=menus.js.map