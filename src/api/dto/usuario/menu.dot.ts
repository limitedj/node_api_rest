import { Optional } from 'sequelize/types';
import { CreateRolDTO } from './rol.dot';


export type CreateMenuDTO = {
       
    codigo          : string;
    descripcion?    : string;
    estado?         : boolean;
    rol?            : CreateRolDTO[];

};

export type UpdateMenuDTO = Optional <CreateMenuDTO, 'codigo'>

export type FilterMenuDTO = {
    isDeleted: boolean
    includeDeleted: boolean
}

