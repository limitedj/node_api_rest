import Usuario from '../../../interfaces/usuario/usuarios.interfaces';
import { UsuarioOutput } from '../../../../db/models';


export const toUsuario = (usuario: UsuarioOutput) : Usuario  => {
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

