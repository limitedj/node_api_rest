import {Op} from 'sequelize'
import {isEmpty} from 'lodash'

import Rol from '../../models/usuario/rol'
import {GetAllRolsFilters} from '../types'
import {RolInput, RolOuput} from '../../models'

export const create = async (payload: RolInput): Promise<RolOuput> => {
    const rol = await Rol.create(payload);
    return rol;
}

export const findOrCreate = async (payload: RolInput): Promise<RolOuput> => {
    const [rol] = await Rol.findOrCreate({
        where: {
            codigo: payload.codigo
        },
        defaults: payload
    })

    return rol
}

export const update = async (id: number, payload: Partial<RolInput>): Promise<RolOuput> => {
    const rol = await Rol.findByPk(id)

    if (!rol) {
        // @todo throw custom error
        throw new Error('not found')
    }

    const updatedRol = await rol.update(payload)
    return updatedRol
}

export const getById = async (id: number): Promise<RolOuput> => {
    const rol = await Rol.findByPk(id)

    if (!rol) {
        // @todo throw custom error
        throw new Error('not found')
    }

    return rol
}

export const deleteById = async (id: number): Promise<boolean> => {
    const deletedRolCount = await Rol.destroy({
        where: {id}
    })

    return !!deletedRolCount
}

export const getAll = async (filters?: GetAllRolsFilters): Promise<RolOuput[]> => {
    return Rol.findAll({
        where: {
            ...(filters?.isDeleted && {deletedAt: {[Op.not]: null}})
        },
        ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true})
    })
}

// export const checkSlugExists = async (slug: string): Promise<boolean> => {
//     const rolWithSlug = await Rol.findOne({
//         where: {
//             slug
//         }
//     });

//     return !isEmpty(rolWithSlug)
// 

// }