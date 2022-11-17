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
exports.deleteById = exports.getById = exports.getAll = exports.getAllShort = exports.getAllPag = void 0;
const menu_rol_1 = __importDefault(require("../../../../db/models/usuario/menu_rol"));
//Obtener todos los MenuRol paginados
const getAllPag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limite = 5, desde = 5 } = req.query;
    const roles = yield menu_rol_1.default.findAndCountAll({
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
//Obtener todos los MenuRol
const getAllShort = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rol = yield menu_rol_1.default.findAll({ attributes: ['id', 'codigo'] });
    // const rol = await MenuRol.findAll();
    res.json(rol);
});
exports.getAllShort = getAllShort;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rol = yield menu_rol_1.default.findAll();
    res.json({ rol, ok: true, });
});
exports.getAll = getAll;
//Obtener un rol por id
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const rol = yield menu_rol_1.default.findByPk(id);
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
// Crear MenuRol
// export const create = async (req: Request, res: Response) => {
//     // const error = validationResult(req);
//     // if (!error.isEmpty()) {
//     //     return res.status(400).json({
//     //         ok: false,
//     //         error: error.mapped()
//     //     })
//     // };
//     const { body, headers }  = req;
//     const token = req.header( 'x-token' ) || '' ;
//     const {password} = body;
//     try {
//         const existeMenuRol = await MenuRol.findOne({
//             where: {
//                 codigo: body.id
//             }
//         });
//         if (existeMenuRol) {
//             return res.status(400).json({
//                 msg: 'Ya existe el rol con el codigo ' + body.codigo
//             });
//         }
//         // const salt = bcryptjs.genSaltSync();
//         // body.password = bcryptjs.hashSync(password, salt);
//         const rol = await MenuRol.create(body);
//         // await rol.save();
//         res.status(200).json({
//             ok: true,
//             msg: 'El rol se creo con éxito',
//             rol,
//             token
//         })
//         //  res.json(usuario);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             msg: 'Hable con el Administrador'
//         })
//     }
// };
// //Actualizar un usuario
// export const updateById = async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const { password, google, email, ...resto } = req.body;
//     if (password){
//         // Encriptar la contraseña
//         const salt = bcryptjs.genSaltSync();
//         resto.password = bcryptjs.hashSync(password, salt);
//     }
//     try {
//         const rol = await MenuRol.findByPk(id, resto);
//         if (!rol) {
//             return res.status(404).json({
//                 msg: 'No existe un usuario con el id ' + id
//             });
//         }
//         await rol.update(resto);
//         await rol.save();
//         res.status(200).json({
//             ok: true,
//             msg: 'La actualización se realizó con éxito'
//         })
//         // res.json(MenuRol);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             msg: 'Hable con el administrador Update'
//         })
//     }
// };
const deleteById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const rol = yield menu_rol_1.default.findByPk(id);
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
// import { MenuRol } from '../../interfaces'
// import * as mapper from './mapper'
// import * as service from '../../../db/services/service.rol'
// import { GetAllMenuRolesFilters } from '../../../db/models/types';
// import { CreateMenuRolDTO, UpdateMenuRolDTO } from '../../dto/rol.dot';
// export const create = async (payload: CreateMenuRolDTO): Promise<MenuRol> => {
//     return mapper.toMenuRol(await service.create(payload))
// }
// export const updateById = async (id: number, payload: UpdateMenuRolDTO): Promise<MenuRol> => {
//     return mapper.toMenuRol(await service.update(id, payload))
// }
// export const getById = async (id: number): Promise<MenuRol> => {
//     return mapper.toMenuRol(await service.getById(id))
// }
// export const deleteById = (id: number): Promise<boolean> => {
//     return service.deleteById(id)
// }
// export const getAll = async (filters: GetAllMenuRolesFilters): Promise<MenuRol[]> => {
//     return (await service.getAll(filters)).map(mapper.toMenuRol)
// }
// export const getAllShort = async (filters: GetAllMenuRolesFilters): Promise<MenuRol[]> => {
//     return (await service.getAll(filters)).map(mapper.toMenuRol)
// }
//# sourceMappingURL=index.js.map