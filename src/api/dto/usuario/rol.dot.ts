import { Optional } from 'sequelize/types';


export type CreateRolDTO = {

    codigo        : string;
    descripcion ? : string;
    estado ?      : boolean;

};

export type UpdateRolDTO = Optional <CreateRolDTO, 'codigo'>

export type FilterRolDTO = {
    isDeleted?: boolean
    includeDeleted?: boolean
}

