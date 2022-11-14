import { Optional } from "sequelize/types"
import { UsuarioOutput } from '../../../db/models/usuario/usuario';

// export type CreateUsuarioDTO = Optional<UsuarioOutput, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>

export type CreateUsuarioDTO = Required<UsuarioOutput>

export type UpdateUsuarioDTO = Optional<CreateUsuarioDTO, 'email'>

// export type UsuarioDTO = Optional<UsuarioOutput, "email" & "password" & "updateAT" & "DeleteAT" & "CreateAT">

export type FilterUsuariosDTO = {
    isDeleted?      : boolean
    includeDeleted? : boolean

}



