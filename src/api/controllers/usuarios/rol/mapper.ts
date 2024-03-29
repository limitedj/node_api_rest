
import { RolOutput } from "../../../../db/models";
import { Rol } from '../../../interfaces'


export const toRol = (rol: RolOutput): Rol => {
    return {
            id          : rol.id       ,
            codigo      : rol.codigo   ,
            descripcion : rol.descripcion ,
            estado      : rol.estado    ,
            createdAt   : rol.createdAt,
            updatedAt   : rol.updatedAt,
            deletedAt   : rol.deletedAt,
    }
}

