import { UsuarioOuput } from "../../../../db/models";
import { Usuario } from "../../../interfaces";


export const toUsuario = (usuario: UsuarioOuput): Usuario => {
    return {
            id         : usuario.id       ,
            nombre     : usuario.nombre   ,
            apellido   : usuario.apellido ,
            email      : usuario.email    ,
            password   : usuario.password ,
            imagen     : usuario.imagen   ,
            estado     : usuario.estado   ,
            createdAt  : usuario.createdAt,
            updatedAt  : usuario.updatedAt,
            deletedAt  : usuario.deletedAt,
    }
}
