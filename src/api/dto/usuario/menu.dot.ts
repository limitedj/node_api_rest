import { Optional } from 'sequelize/types';
import { MenuOutput } from '../../../db/models';

// export type CreateMenuDTO = Optional<RolOutput, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
export type CreateMenuDTO = Required<MenuOutput>

// export type CreateMenuDTO = {
       
//     codigo          : string;
//     descripcion?    : string;
//     estado?         : boolean;
//     // rol?            : CreateRolDTO[];

// };

export type UpdateMenuDTO = Optional <CreateMenuDTO, 'codigo'>

export type FilterMenuDTO = {
    isDeleted: boolean
    includeDeleted: boolean
}

