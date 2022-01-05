import {kebabCase} from 'lodash'

import * as usuarioDal from '../dal/usuario'
import {GetAllUsuariosFilters} from '../dal/types'
import { UsuarioOuput, UsuarioInput } from '../models'
import db from '../config'
// import {UsuarioInput, UsuarioOuput} from '../models/Usuario'



export const create = async (payload: UsuarioInput): Promise<UsuarioOuput> => {
    let slug = kebabCase(payload.nombre)
    // const slugExists = await usuarioDal.checkSlugExists(slug)
    
    // payload.email = emailExists ? `${slug}-${Math.floor(Math.random() * 1000)}` : slug
    
    return usuarioDal.create(payload)
}

export const update = async (id: number, payload: Partial<UsuarioInput>): Promise<UsuarioOuput> => {
    if (payload.nombre) {
        let slug = kebabCase(payload.nombre)
        // const slugExists = await usuarioDal.checkSlugExists(slug)
        // payload.slug = slugExists ? `${slug}-${Math.floor(Math.random() * 1000)}` : slug
    }
    
    return usuarioDal.update(id, payload)
}

export const getById = (id: number): Promise<UsuarioOuput> => {
    return usuarioDal.getById(id)
}

export const deleteById = (id: number): Promise<boolean> => {
    return usuarioDal.deleteById(id)
}

export const getAll = (filters: GetAllUsuariosFilters): Promise<UsuarioOuput[]> => {
    return usuarioDal.getAll(filters)
}