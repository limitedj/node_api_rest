import { Optional } from "sequelize/types"

export type CreateUsuarioDTO = {
        id ?        : number;
        nombre ?    : string;
        apellido ?  : string;
        email ?     : string;
        password ?  : string;
        imagen ?    : string;
        estado ?    : boolean;
}

export type UpdateUsuarioDTO = Optional<CreateUsuarioDTO, 'nombre'>

export type FilterUsuariosDTO = {
    isDeleted?      : boolean
    includeDeleted? : boolean
}