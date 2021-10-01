import { Request, Response, NextFunction } from 'express';
import { header, validationResult } from 'express-validator';
import Usuario from '../models/usuario';
import bcryptjs from 'bcryptjs';
import { AuthResponse } from '../interfaces/borrame_interfaces';


//Obtener todos los Usuarios paginados

export const getUsuariosPag = async (req: Request, res: Response) => {

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

export const getUsuarios = async (req: Request, res: Response) => {

    const usuarios = await Usuario.findAll();

    res.json({ usuarios });

};

//Obtener un usuario por id

export const getUsuario = async (req: Request, res: Response) => {

    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);
    
    if (usuario) {
        res.json({ usuario });
    } else {
      return  res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        });
    }
};

// Crear Usuarios

export const crearUsuario = async (req: Request, res: Response) => {

    // const error = validationResult(req);
    // if (!error.isEmpty()) {
    //     return res.status(400).json({
    //         ok: false,
    //         error: error.mapped()
    //     })
    // };

    
    const { body, headers }  = req;

    const token = req.header( 'x-token' ) || '' ;
    

    const {password} = body;

    try {
        const existeEmail = await Usuario.findOne({
            where: {
                email: body.email
            }
        });

        if (existeEmail) {
            return res.status(400).json({
                msg: 'Ya existe el usuario con el email ' + body.email
            });
        }

        const salt = bcryptjs.genSaltSync();
        body.password = bcryptjs.hashSync(password, salt);

        const usuario = await Usuario.create(body);
        
        await usuario.save();

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

export const putUsuario = async (req: Request, res: Response) => {

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


export const deleteUsuario = async (req: Request, res: Response, next: NextFunction) => {

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

