import {kebabCase} from 'lodash'

import * as menuDal from '../../dal/usuario/menu.dal'
import {GetAllMenusFilters} from '../../dal/types'
import {MenuInput, MenuOutput} from '../../models/'


export const create = async (payload: MenuInput): Promise<MenuOutput> => {
    let slug = kebabCase(payload.codigo)
    // const slugExists = await menuDal.checkSlugExists(slug)

    // payload.email = emailExists ? `${slug}-${Math.floor(Math.random() * 1000)}` : slug
    
    return menuDal.create(payload)
}

// async (req: Request, res: Response) => {
//     const id = Number(req.params.id)

//     const result = await ingredientController.getById(id)
//     return res.status(200).send(result)


export const update = async (id: number, payload: Partial<MenuInput>): Promise<MenuOutput> => {
    if (payload.codigo) {
        let slug = kebabCase(payload.codigo)
        // const slugExists = await menuDal.checkSlugExists(slug)
        // payload.slug = slugExists ? `${slug}-${Math.floor(Math.random() * 1000)}` : slug
    }
    
    return menuDal.update(id, payload)
}

export const getById = (id: number): Promise<MenuOutput> => {
    return menuDal.getById(id)
}

export const deleteById = (id: number): Promise<boolean> => {
    return menuDal.deleteById(id)
}
    (filters: GetAllMenusFilters): Promise<MenuOutput[]> => {

        return menuDal.getAll(filters)
};

export const getAll = (filters: GetAllMenusFilters): Promise<MenuOutput[]> => {
    // console.log(`Paso por el Capa de Servicio isDeleted ${filters?.isDeleted} includeDeleted ${filters?.includeDeleted}`);
    return menuDal.getAll(filters)
}

