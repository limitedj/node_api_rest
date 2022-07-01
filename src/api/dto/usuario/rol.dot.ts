import { Optional } from 'sequelize/types';


export type CreateRolDTO = {

    id            : number;
    codigo        : string;
    descripcion ? : string;
    estado ?      : boolean;

};

export type UpdateRolDTO = Optional <CreateRolDTO, 'id'>

export type FilterRolDTO = {
    isDeleted?: boolean
    includeDeleted?: boolean
}

