import {kebabCase} from 'lodash'

import * as rolDal from '../../dal/usuario/rol.dal'
import {GetAllRolsFilters} from '../../dal/types'
import { RolOuput } from '../../models'
// import {RolInput, RolOuput} from '../models/Rol'
import { RolInput } from '../../models/usuario/rol';

export const create = async (payload: RolInput): Promise<RolOuput> => {
    let slug = kebabCase(payload.codigo)
    // const slugExists = await rolDal.checkSlugExists(slug)

    // payload.email = emailExists ? `${slug}-${Math.floor(Math.random() * 1000)}` : slug
    
    return rolDal.create(payload)
}

export const update = async (id: number, payload: Partial<RolInput>): Promise<RolOuput> => {
    if (payload.codigo) {
        let slug = kebabCase(payload.codigo)
        // const slugExists = await rolDal.checkSlugExists(slug)
        // payload.slug = slugExists ? `${slug}-${Math.floor(Math.random() * 1000)}` : slug
    }
    
    return rolDal.update(id, payload)
}

export const getById = (id: number): Promise<RolOuput> => {
    return rolDal.getById(id)
}

export const deleteById = (id: number): Promise<boolean> => {
    return rolDal.deleteById(id)
}

export const getAll = (filters: GetAllRolsFilters): Promise<RolOuput[]> => {
    return rolDal.getAll(filters)
}