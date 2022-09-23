import {Op} from 'sequelize'

import { Usuario, UsuarioInput, UsuarioOutput} from '../../models'
import { GetAllUsuariosFilters } from '../types';
import { Rol } from '../../models/';
import bcryptjs from 'bcryptjs';
import { error } from 'console';

export const create = async (payload: UsuarioInput): Promise<UsuarioOutput> => {

        const existeEmail = await Usuario.findOne({
                    where: {
                        email: payload.email
                    }
                })

                if (existeEmail) {
                    // @todo throw custom error
                    throw new Error(`Ya existe el usuario con el email ${payload.email}`)
                }
        
        const salt = bcryptjs.genSaltSync();
        payload.password = bcryptjs.hashSync(payload.password, salt);

        const usuario = await Usuario.create(payload);

    return usuario;
}

export const findOrCreate = async (payload: UsuarioInput): Promise<UsuarioOutput> => {
    const [usuario] = await Usuario.findOrCreate({
        where: {
            nombre: payload.nombre
        },
        defaults: payload
    })

    return usuario
}

export const update = async (id: number, payload: Partial<UsuarioInput>): Promise<UsuarioOutput> => {
    const usuario = await Usuario.findByPk(id)

    if (!usuario) {
        // @todo throw custom error
        throw new Error('usuario no encontrado')
    }

        if (payload.password){
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        payload.password = bcryptjs.hashSync(payload.password, salt);
    }

    const updatedUsuario = await usuario.update(payload)
    return updatedUsuario
}

export const getById = async (id: number): Promise<UsuarioOutput> => {
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

export const getAll = async (filters?: GetAllUsuariosFilters): Promise<UsuarioOutput[]> => {
    return Usuario.findAll({include: [ {model:Rol, attributes: ['id', 'descripcion']}],
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