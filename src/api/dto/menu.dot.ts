import { Optional } from 'sequelize/types';


export type CreateMenuDTO = {

    codigo          : string;
    descripcion ?   : string;
    estado ?        : boolean;

};

export type UpdateMenuDTO = Optional <CreateMenuDTO, 'codigo'>

export type FilterMenuDTO = {
    isDeleted?: boolean
    includeDeleted?: boolean
}

