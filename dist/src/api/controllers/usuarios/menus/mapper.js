"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toMenu = void 0;
const toMenu = (menu) => {
    return {
        id: menu.id,
        codigo: menu.codigo,
        descripcion: menu.descripcion,
        estado: menu.estado,
        createdAt: menu.createdAt,
        updatedAt: menu.updatedAt,
        deletedAt: menu.deletedAt,
    };
};
exports.toMenu = toMenu;
//# sourceMappingURL=mapper.js.map