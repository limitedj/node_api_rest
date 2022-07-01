import {Op} from 'sequelize'
import {isEmpty} from 'lodash'

import {Menu} from '../../models'
import {GetAllMenusFilters} from '../types'
import {MenuInput, MenuOuput} from '../../models'

export const create = async (payload: MenuInput): Promise<MenuOuput> => {
    const menu = await Menu.create(payload);
    return menu;
}

export const findOrCreate = async (payload: MenuInput): Promise<MenuOuput> => {
    const [menu] = await Menu.findOrCreate({
        where: {
            codigo: payload.codigo
        },
        defaults: payload
    })

    return menu
}

export const update = async (id: number, payload: Partial<MenuInput>): Promise<MenuOuput> => {
    const menu = await Menu.findByPk(id)

    if (!menu) {
        // @todo throw custom error
        throw new Error('not found')
    }

    const updatedMenu = await menu.update(payload)
    return updatedMenu
}


export const deleteById = async (id: number): Promise<boolean> => {
    const deletedMenuCount = await Menu.destroy({
        where: {id}
    })
    
    return !!deletedMenuCount
}

export const getById = async (id: number): Promise<MenuOuput> => {
    const menu = await Menu.findByPk(id)

    if (!menu) {
        // @todo throw custom error
        throw new Error('Menú inexistente')
    }

    return menu
}


export const getAll = async (filters?: GetAllMenusFilters): Promise<MenuOuput[]> => {
    // console.log(`Paso por el DAL isDeleted ${filters?.isDeleted} includeDeleted ${filters?.includeDeleted}`);
    return Menu.findAll(
    {
        where: {
            ...(filters?.isDeleted && {deletedAt: {[Op.not]: null}})
        },
            ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true})
    }
    
    )
    
}
