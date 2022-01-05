import { Request, Response, NextFunction } from 'express';
import bcryptjs from 'bcryptjs';
import  Menu  from '../../../db/models/menu';

//Obtener todos los Menus paginados

export const getAllPag = async (req: Request, res: Response) => {

    const {limite = 5, desde = 5} = req.query;

    const menus = await Menu.findAndCountAll({
        // where: {...},
        // order: [...],
        limit: Number(limite),
        offset: Number(desde)
    });
    // .then(function (result) {
    //     res.json({ Menus });
    // });    

    res.json({ menus });
};


//Obtener todos los Menus

export const getAll = async (req: Request, res: Response) => {

    const menus = await Menu.findAll();

    res.json({ menus });

};

//Obtener un Menus por id

export const getById = async (req: Request, res: Response) => {

    const { id } = req.params;

    const menus = await Menu.findByPk(id);
    
    if (menus) {
        res.json({ menus });
    } else {
      return  res.status(404).json({
            msg: `No existe un menu con el id ${id}`
        });
    }
};

// Crear Menu

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
    

    const {password} = body;

    try {
        const existeMenu = await Menu.findOne({
            where: {
                codigo: body.codigo
            }
        });

        if (existeMenu) {
            return res.status(400).json({
                msg: 'Ya existe el menu con el codigo ' + body.codigo
            });
        }

        // const salt = bcryptjs.genSaltSync();
        // body.password = bcryptjs.hashSync(password, salt);

        const menu = await Menu.create(body);
        
        await menu.save();

        res.status(200).json({
            ok: true,
            msg: 'El menu se creo con éxito',
            menu,
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

        const menu = await Menu.findByPk(id, resto);
        if (!menu) {
            return res.status(404).json({
                msg: 'No existe un usuario con el id ' + id
            });
        }

        await menu.update(resto);

        await menu.save();
        res.status(200).json({
            ok: true,
            msg: 'La actualización se realizó con éxito'
        })
        // res.json(Menu);


    } catch (error) {
        console.log(error);
        
        res.status(500).json({

            msg: 'Hable con el administrador Update'
        })
    }
};


export const deleteById = async (req: Request, res: Response, next: NextFunction) => {

        const { id } = req.params;

        const menu = await Menu.findByPk( id );

        if (!menu) {
            return res.status(400).json({
                msg: 'No existe un menu con el id ' + id
            })
        }


        if (!menu) {
            return res.status(400).json({
                msg: 'No existe un menu con el id ' + id
            })
        }
    
        await menu.update( { estado: false } );

    
    res.json(menu);

};


// import { Menu } from '../../interfaces'
// import * as mapper from './mapper'
// import * as service from '../../../db/services/service.menu'
// import { CreateMenuDTO, UpdateMenuDTO } from '../../dto/menu.dot'
// import { GetAllMenusFilters } from '../../../db/dal/types'

// export const create = async (payload: CreateMenuDTO): Promise<Menu> => {
//     return mapper.toMenu(await service.create(payload))
// }

// export const updateById = async (id: number, payload: UpdateMenuDTO): Promise<Menu> => {
//     return mapper.toMenu(await service.update(id, payload))
// }

// export const getById = async (id: number): Promise<Menu> => {
//     return mapper.toMenu(await service.getById(id))
// }

// export const deleteById = (id: number): Promise<boolean> => {
//     return service.deleteById(id)
// }

// export const getAll = async (filters: GetAllMenusFilters): Promise<Menu[]> => {
//     return (await service.getAll(filters)).map(mapper.toMenu)
// }


