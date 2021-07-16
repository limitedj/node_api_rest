import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Usuario from '../models/usuario';
import bcryptjs from 'bcryptjs';

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
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        });
    }

    res.json({ usuario });
};

//login de usuarios

export const loginUsuario = (req: Request, res: Response) => {

    // const error = validationResult(req);
    // if (!error.isEmpty()) {
    //     return res.status(400).json({
    //         ok: false,
    //         error: error.mapped()
    //     })
    // }

};

// Crear Usuarios

export const crearUsuario = async (req: Request, res: Response) => {

    

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({
            ok: false,
            error: error.mapped()
        })
    };

    
    const { body }  = req;

    const {password} = body;

    try {
        // const existeEmail = await Usuario.findOne({
        //     where: {
        //         email: body.email
        //     }
        // });

        // if (existeEmail) {
        //     return res.status(400).json({
        //         msg: 'Ya existe el usuario con el email ' + body.email
        //     });
        // }

        const salt = bcryptjs.genSaltSync();
        body.password = bcryptjs.hashSync(password, salt);

        const usuario = await Usuario.create(body);
        
        await usuario.save();

         res.json(usuario);
         
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
    const { body } = req;

    try {

        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: 'No existe un usuario con el id ' + id
            });
        }

        await usuario.update(body);

        await usuario.save();
        
        res.json(usuario);


    } catch (error) {
        console.log(error);
        
        res.status(500).json({

            msg: 'Hable con el administrador Update'
        })
    }
};


export const deleteUsuario = async (req: Request, res: Response) => {

    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
        return res.status(400).json({
            msg: 'No existe un usuario con el id ' + id
        })
    }

    await usuario.destroy();

    res.json(usuario);

};



