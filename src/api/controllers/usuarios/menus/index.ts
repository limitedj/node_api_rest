import { Request, Response} from 'express'
import { Menu } from '../../../interfaces'
import * as mapper from './mapper'
import * as service from '../../../../db/services/usuario/service.menu'
import { CreateMenuDTO, UpdateMenuDTO, FilterMenuDTO } from '../../../dto/usuario/menu.dot';
import { GetAllMenusFilters } from '../../../../db/dal/types'
import { param } from 'express-validator';

export const getAll = async (req: Request<GetAllMenusFilters>, res: Response) => {
       const filters = req.query
       const results = (await service.getAll(filters)).map(mapper.toMenu);
       return res.status(200).send(results);
}

export const getById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    console.log(`Paso por el controllerMenu id: ${id}`)
    const results = mapper.toMenu(await service.getById(id));
    return res.status(200).send(results);
}

export const create = async (req: Request, res: Response) => {
    const payload:CreateMenuDTO = req.body;
    const results = mapper.toMenu(await service.create(payload));
    return res.status(200).send(results);
}

export const updateById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const payload:UpdateMenuDTO = req.body;
    return mapper.toMenu(await service.update(id, payload))
}

export const deleteById = async (req: Request, res: Response) => {
        const id = Number(req.params.id)
        return service.deleteById(id)
}


