import { Request, Response} from 'express'
import {Usuario} from '../../../interfaces'
import * as mapper from './mapper'
import * as service from '../../../../db/services/usuario/service.usuario'

import { GetAllUsuariosFilters } from '../../../../db/dal/types'
import { CreateUsuarioDTO, UpdateUsuarioDTO } from '../../../dto/usuario/usuario.dot'

export const getAll = async (req: Request<GetAllUsuariosFilters>, res: Response) => {
    const filters = req.query
    const results = (await service.getAll(filters)).map(mapper.toUsuario);
    return res.status(200).send(results);
}

export const updateById = async (req: Request, res: Response) => {
 const id = Number(req.params.id);
 const payload:UpdateUsuarioDTO = req.body;
 return mapper.toUsuario(await service.update(id, payload))
}

export const create = async (req: Request, res: Response) => {
 const payload:CreateUsuarioDTO = req.body;
 const results = mapper.toUsuario(await service.create(payload));
 return res.status(200).send(results);
}


export const getById = async (req: Request<Usuario>, res: Response) => {
 const id = Number(req.params.id);
 return mapper.toUsuario(await service.getById(id));
}

export const deleteById = async (req: Request, res: Response) => {
     const id = Number(req.params.id)
     return service.deleteById(id)
}

