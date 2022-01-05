import { Router } from "express";
import { check } from "express-validator";
import { create, deleteById, getAll, getAllShort, getById, updateById } from "../controllers/rol";
import { validarCampos } from "../middlewares/validar_campos";

const rolRouters = Router();

rolRouters.get('/small', getAllShort);
rolRouters.get('/',      getAll);
rolRouters.get('/:id',   getById);
rolRouters.post('/crear',[
       check('codigo','El codigo es obligatorio').notEmpty(),
       validarCampos,
       ],
       create);
rolRouters.put('/:id', updateById);

rolRouters.delete('/:id', deleteById);

export default rolRouters;