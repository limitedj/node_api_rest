"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUsuario = void 0;
const toUsuario = (usuario) => {
    return {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        password: usuario.password,
        imagen: usuario.imagen,
        estado: usuario.estado,
        createdAt: usuario.createdAt,
        updatedAt: usuario.updatedAt,
        deletedAt: usuario.deletedAt,
    };
};
exports.toUsuario = toUsuario;
//# sourceMappingURL=mapper.js.map