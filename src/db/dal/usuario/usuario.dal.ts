import {Op} from 'sequelize'
import {isEmpty} from 'lodash'
import Usuario from '../../models/usuario/usuario';


import { UsuarioInput, UsuarioOuput} from '../../models'
import { GetAllUsuariosFilters } from '../types';
import { Rol } from '../../models/';



export const create = async (payload: UsuarioInput): Promise<UsuarioOuput> => {
    const usuario = await Usuario.create(payload);
    return usuario;
}

export const findOrCreate = async (payload: UsuarioInput): Promise<UsuarioOuput> => {
    const [usuario] = await Usuario.findOrCreate({
        where: {
            nombre: payload.nombre
        },
        defaults: payload
    })

    return usuario
}

export const update = async (id: number, payload: Partial<UsuarioInput>): Promise<UsuarioOuput> => {
    const usuario = await Usuario.findByPk(id)

    if (!usuario) {
        // @todo throw custom error
        throw new Error('not found')
    }

    const updatedUsuario = await usuario.update(payload)
    return updatedUsuario
}

export const getById = async (id: number): Promise<UsuarioOuput> => {
    const usuario = await Usuario.findByPk(id)

    if (!usuario) {
        // @todo throw custom error
        throw new Error('not found')
    }

    return usuario
}

export const deleteById = async (id: number): Promise<boolean> => {
    const deletedUsuarioCount = await Usuario.destroy({
        where: {id}
    })

    return !!deletedUsuarioCount
}

export const getAll = async (filters?: GetAllUsuariosFilters): Promise<UsuarioOuput[]> => {
    return Usuario.findAll({include: [ {model:Rol, attributes: ['descripcion'] }],
        where: {...(filters?.isDeleted && {deletedAt: {[Op.not]: null}}) },
        ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true})
    })
}

// export const checkSlugExists = async (slug: string): Promise<boolean> => {
//     const usuarioWithSlug = await Usuario.findOne({
//         where: {
//             slug
//         }
//     });

//     return !isEmpty(usuarioWithSlug)
// 

// }