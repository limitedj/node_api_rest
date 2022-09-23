import {kebabCase} from 'lodash'

import * as usuarioDal from "../../../db/dal/usuario/usuario.dal"
import {GetAllUsuariosFilters} from '../../dal/types'
import {UsuarioInput} from '../../models'
import db from '../../config'
// import {UsuarioInput, UsuarioOutput} from '../models/Usuario'
import { UsuarioOutput } from '../../models';



export const create = async (payload: UsuarioInput): Promise<UsuarioOutput> => {
    let slug = kebabCase(payload.nombre)
    // const slugExists = await usuarioDal.checkSlugExists(slug)
    
    // payload.email = emailExists ? `${slug}-${Math.floor(Math.random() * 1000)}` : slug
    
    return usuarioDal.create(payload)
}

export const update = async (id: number, payload: Partial<UsuarioInput>): Promise<UsuarioOutput> => {
    if (payload.nombre) {
        let slug = kebabCase(payload.nombre)
        // const slugExists = await usuarioDal.checkSlugExists(slug)
        // payload.slug = slugExists ? `${slug}-${Math.floor(Math.random() * 1000)}` : slug
    }
    
    return usuarioDal.update(id, payload)
}

export const getById = (id: number): Promise<UsuarioOutput> => {
    return usuarioDal.getById(id)
}

export const deleteById = (id: number): Promise<boolean> => {
    return usuarioDal.deleteById(id)
}

export const getAll = (filters: GetAllUsuariosFilters): Promise<UsuarioOutput[]> => {
    return usuarioDal.getAll(filters)
}