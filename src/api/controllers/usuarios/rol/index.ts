import { Request, Response} from 'express'
import * as interfacesUsuario from '../../../interfaces'
import * as mapper from './mapper'
import * as service from '../../../../db/services/usuario/service.rol'
import { CreateRolDTO, UpdateRolDTO } from '../../../dto/usuario/rol.dot';
import { GetAllRolsFilters } from '../../../../db/dal/types'
import { RolOuput } from '../../../../db/models/usuario/rol';

export const getAll = async (req: Request<GetAllRolsFilters>, res: Response) => {
       const filters = req.query
       const results = (await service.getAll(filters)).map(mapper.toRol);
       return res.status(200).send(results);
}

export const updateById = async (req: Request<UpdateRolDTO>, res: Response) => {
    const id = Number(req.params.id);
    const payload:UpdateRolDTO = req.body;
    return mapper.toRol(await service.update(id, payload))
}

export const create = async (req: Request, res: Response) => {
    const payload:CreateRolDTO = req.body;
    const results = mapper.toRol(await service.create(payload));
    return res.status(200).send(results);
}


export const getById = async (req: Request<interfacesUsuario.Usuario>, res: Response) => {
    const id = Number(req.params.id);
    return mapper.toRol(await service.getById(id));
}

export const deleteById = async (req: Request, res: Response) => {
        const id = Number(req.params.id)
        return service.deleteById(id)
}


