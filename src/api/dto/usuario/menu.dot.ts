import { Optional } from 'sequelize/types';


export type CreateMenuDTO = {

    id             : number; 
    codigo         : string;
    descripcion    : string;
    estado         : boolean;

};

export type UpdateMenuDTO = Optional <CreateMenuDTO, 'id'>

export type FilterMenuDTO = {
    isDeleted: boolean
    includeDeleted: boolean
}

