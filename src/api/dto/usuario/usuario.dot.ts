import { Optional } from "sequelize/types"
import { CreateRolDTO } from './rol.dot';

export type CreateUsuarioDTO = {

        nombre ?    : string;
        apellido ?  : string;
        email       : string;
        password ?  : string;
        imagen ?    : string;
        estado ?    : boolean;
        rol?        : CreateRolDTO[];
}

export type UpdateUsuarioDTO = Optional<CreateUsuarioDTO, 'email'>

export type FilterUsuariosDTO = {
    isDeleted?      : boolean
    includeDeleted? : boolean
}