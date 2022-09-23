import { Optional } from 'sequelize/types';
import { RolOutput } from '../../../db/models';

// export type CreateRolDTO = Optional<RolOutput, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
export type CreateRolDTO = Required<RolOutput>
// export type CreateRolDTO = {

//     codigo        : string;
//     descripcion ? : string;
//     estado ?      : boolean;

// };

export type UpdateRolDTO = Optional <CreateRolDTO, 'codigo'>

export type FilterRolDTO = {
    isDeleted?: boolean
    includeDeleted?: boolean
}

