import { Request, Response, NextFunction } from 'express';
import bcryptjs from 'bcryptjs';
import Rol from '../../../db/models/rol';


//Obtener todos los Rol paginados

export const getAllPag = async (req: Request, res: Response) => {

    const {limite = 5, desde = 5} = req.query;

    const roles = await Rol.findAndCountAll({
        // where: {...},
        // order: [...],
        limit: Number(limite),
        offset: Number(desde)
    });
    // .then(function (result) {
    //     res.json({ rol });
    // });    

    res.json({ roles });
};


//Obtener todos los Rol

export const getAllShort = async (req: Request, res: Response) => {

    const rol = await Rol.findAll({attributes:['id','codigo']});

    // const rol = await Rol.findAll();

    res.json( rol );

};

export const getAll = async (req: Request, res: Response) => {

    const rol = await Rol.findAll();

    res.json({ rol, ok: true, });

};

//Obtener un rol por id

export const getById = async (req: Request, res: Response) => {

    const { id } = req.params;

    const rol = await Rol.findByPk(id);
    
    if (rol) {
        res.json({ rol });
    } else {
      return  res.status(404).json({
            msg: `No existe un rol con el id ${id}`
        });
    }
};

// Crear Rol

export const create = async (req: Request, res: Response) => {

    // const error = validationResult(req);
    // if (!error.isEmpty()) {
    //     return res.status(400).json({
    //         ok: false,
    //         error: error.mapped()
    //     })
    // };

    
    const { body, headers }  = req;

    const token = req.header( 'x-token' ) || '' ;
    

    const {codigo, descripcion} = body;

    try {
        const existeRol = await Rol.findOne({
            where: {
                codigo: body.codigo
            }
        });

        if (existeRol) {
            return res.status(400).json({
                msg: 'Ya existe el rol con el codigo ' + body.codigo
            });
        }

        // const salt = bcryptjs.genSaltSync();
        // body.password = bcryptjs.hashSync(password, salt);

        const rol = await Rol.create(body);
        
        // await rol.save();

        res.status(200).json({
            ok: true,
            msg: 'El rol se creo con éxito',
            rol,
            token
        })
        
        //  res.json(usuario);

         
    } catch (error) {
        console.log(error);
        res.status(500).json({
           
            msg: 'Hable con el Administrador'
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

        const rol = await Rol.findByPk(id, resto);
        if (!rol) {
            return res.status(404).json({
                msg: 'No existe un usuario con el id ' + id
            });
        }

        await rol.update(resto);

        await rol.save();
        res.status(200).json({
            ok: true,
            msg: 'La actualización se realizó con éxito'
        })
        // res.json(Rol);


    } catch (error) {
        console.log(error);
        
        res.status(500).json({

            msg: 'Hable con el administrador Update'
        })
    }
};


export const deleteById = async (req: Request, res: Response, next: NextFunction) => {

        const { id } = req.params;

        const rol = await Rol.findByPk( id );

        if (!rol) {
            return res.status(400).json({
                msg: 'No existe un rol con el id ' + id
            })
        }


        if (!rol) {
            return res.status(400).json({
                msg: 'No existe un rol con el id ' + id
            })
        }
    
        await rol.update( { estado: false } );

    
    res.json(rol);

};







// import { Rol } from '../../interfaces'
// import * as mapper from './mapper'
// import * as service from '../../../db/services/service.rol'

// import { GetAllRolesFilters } from '../../../db/models/types';
// import { CreateRolDTO, UpdateRolDTO } from '../../dto/rol.dot';


// export const create = async (payload: CreateRolDTO): Promise<Rol> => {
//     return mapper.toRol(await service.create(payload))
// }

// export const updateById = async (id: number, payload: UpdateRolDTO): Promise<Rol> => {
//     return mapper.toRol(await service.update(id, payload))
// }

// export const getById = async (id: number): Promise<Rol> => {
//     return mapper.toRol(await service.getById(id))
// }

// export const deleteById = (id: number): Promise<boolean> => {
//     return service.deleteById(id)
// }

// export const getAll = async (filters: GetAllRolesFilters): Promise<Rol[]> => {
//     return (await service.getAll(filters)).map(mapper.toRol)
// }

// export const getAllShort = async (filters: GetAllRolesFilters): Promise<Rol[]> => {
//     return (await service.getAll(filters)).map(mapper.toRol)
// }
