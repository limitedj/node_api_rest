"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toRol = void 0;
const toRol = (rol) => {
    return {
        id: rol.id,
        codigo: rol.codigo,
        descripcion: rol.descripcion,
        estado: rol.estado,
        createdAt: rol.createdAt,
        updatedAt: rol.updatedAt,
        deletedAt: rol.deletedAt,
    };
};
exports.toRol = toRol;
//# sourceMappingURL=mapper.js.map