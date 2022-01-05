import {kebabCase} from 'lodash'

import * as menuDal from '../dal/menu'
import {GetAllMenusFilters} from '../dal/types'
import { MenuOuput } from '../models'
// import {MenuInput, MenuOuput} from '../models/Menu'
import { MenuInput } from '../models/menu';

export const create = async (payload: MenuInput): Promise<MenuOuput> => {
    let slug = kebabCase(payload.codigo)
    // const slugExists = await menuDal.checkSlugExists(slug)

    // payload.email = emailExists ? `${slug}-${Math.floor(Math.random() * 1000)}` : slug
    
    return menuDal.create(payload)
}

export const update = async (id: number, payload: Partial<MenuInput>): Promise<MenuOuput> => {
    if (payload.codigo) {
        let slug = kebabCase(payload.codigo)
        // const slugExists = await menuDal.checkSlugExists(slug)
        // payload.slug = slugExists ? `${slug}-${Math.floor(Math.random() * 1000)}` : slug
    }
    
    return menuDal.update(id, payload)
}

export const getById = (id: number): Promise<MenuOuput> => {
    return menuDal.getById(id)
}

export const deleteById = (id: number): Promise<boolean> => {
    return menuDal.deleteById(id)
}

export const getAll = (filters: GetAllMenusFilters): Promise<MenuOuput[]> => {
    return menuDal.getAll(filters)
}