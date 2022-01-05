import Rol  from '../../../db/models/rol';
import Usuario from '../../../db/models/usuario';
import { Request, Response, NextFunction } from 'express';
import bcryptjs from 'bcryptjs';
import db from '../../../db/config';
require('../../../db/config');
import UsuarioRol from '../../../db/models/usuario_rol';

// import {kebabCase} from 'lodash'


// import {GetAllUsuariosFilters} from '../../../db/dal/usuario' 
// import {UsuarioInput, UsuarioOuput} from '../../../db/models'

// import { CreateUsuarioDTO, UpdateUsuarioDTO } from '../../dto/usuario.dot';
// import * as mapper from './mapper'
// import { GetAllUsuariosFilters } from '../../../db/dal/types';
// import { payload } from '../../interfaces/borrame_payload';
// import { servicesVersion } from 'typescript';





// require("../models/asociaciones")

//Obtener todos los Usuarios paginados

export const getAllPag = async (req: Request, res: Response) => {

    const {limite = 5, desde = 5} = req.query;

    const usuarios = await Usuario.findAndCountAll({
        // where: {...},
        // order: [...],
        limit: Number(limite),
        offset: Number(desde)
    });
    // .then(function (result) {
    //     res.json({ usuario });
    // });    

    res.json({ usuarios });
};

//Obtener todos los Usuarios

export const getAll = async (req: Request, res: Response) => {

    const usuarios = await Usuario.findAll({include:Rol});

    res.json({ usuarios });

};

//Obtener un usuario por id

export const getById = async (req: Request, res: Response) => {

    const { id } = req.params;

    const usuario = await Usuario.findByPk(id /*, {include:[Rol]}*/);
    
    if (usuario) {
        res.json({ usuario });
    } else {
      return  res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        });
    }
};

//Crear Usuarios

// export const create = async (id: number, playload: UpdateUsuarioDTO): Promise<Usuario> => {
//     return mapper.toUsuarios(await service.create(playload))};


// Crear Usuarios

export const create = async (req: Request, res: Response) => {

    
    // const error = validationResult(req);
    // if (!error.isEmpty()) {
    //     return res.status(400).json({
    //         ok: false,
    //         error: error.mapped()
    //     })
    // };

    const { body }  = req;

    const token = req.header( 'x-token' ) || '' ;

    const {password, rol} = body;

    try {
        const existeEmail = await Usuario.findOne({
            where: {
                email: body.email
            }
        });

        if (existeEmail) {
            return res.status(400).json({
                msg: `Ya existe el usuario con el email ${body.email}`
            });
        }

        const salt = bcryptjs.genSaltSync();
        body.password = bcryptjs.hashSync(password, salt);
            
        const usuario = await Usuario.create(body);
        await usuario.addRol(body.rol);


        // const usuario = await Usuario.create(body);
        // await usuario.getRols();
            // .then(usuario=>{
            //     usuario.addRol(rol)
            // })


            // await usuario.save();            

        res.status(200).json({
            ok: true,
            msg: 'La actualización se realizó con éxito',
            usuario,
            token
            
        })
        
        //  res.json(usuario);

         
    } catch (error) {
        console.log(error);
        res.status(500).json({
           
            msg: 'Hable con el administrador Miguel Angel'
        })
    }
};

//Actualizar un usuario

export const updateById = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { password, google, email, ...resto } = req.body;

    if (password){
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    try {

        const usuario = await Usuario.findByPk(id, resto);
        if (!usuario) {
            return res.status(404).json({
                msg: 'No existe un usuario con el id ' + id
            });
        }

        await usuario.update(resto);

        await usuario.save();
        res.status(200).json({
            ok: true,
            msg: 'La actualización se realizó con éxito'
        })
        // res.json(usuario);


    } catch (error) {
        console.log(error);
        
        res.status(500).json({

            msg: 'Hable con el administrador Update'
        })
    }
};


export const deleteById = async (req: Request, res: Response, next: NextFunction) => {

        const { id } = req.params;

        const usuario = await Usuario.findByPk( id );

        if (!usuario) {
            return res.status(400).json({
                msg: 'No existe un usuario con el id ' + id
            })
        }


        if (!usuario) {
            return res.status(400).json({
                msg: 'No existe un usuario con el id ' + id
            })
        }
    
        await usuario.update( { estado: false } );

    
    res.json(usuario);

};

// export const create = async(payload: CreateUsuarioDTO): Promise<interfaceUsuario.Usuario> => {
//     return mapper.toUsuario(await service.create(payload))
// }

// export const updateById = async (req: Request, res: Response) => {
//     const { id } = req.params;
//     // const { password, google, email, ...resto } = req.body;
//     // const id = Number(req.params.id);
//     const payload:UpdateUsuarioDTO = req.body
//     const update = async(id: number, payload: UpdateUsuarioDTO): Promise<interfaceUsuario.Usuario> => {
//     return mapper.toUsuario(await service.update(id, payload))
// }
// }

// export const getById = async (id: number): Promise<interfaceUsuario.Usuario> => {
//     return mapper.toUsuario(await service.getById(id))
// }

// export const deleteById = async(id: number): Promise<boolean> => {
//     const isDeleted = await service.deleteById(id)

//     return isDeleted
// }

// export const getAll = async(filters: FilterUsuariosDTO): Promise<interfaceUsuario.Usuario[]> => {
//     return (await service.getAll(filters)).map(mapper.toUsuario)
// }
