import { Router } from "express";
import { check } from "express-validator";
import * as rolControlers from "../../controllers/usuarios/rol/";
import { validarCampos } from "../../middlewares/validar_campos";

const rolRouters = Router();

//rolRouters.get('/small', rolControlers.getAllShort);
rolRouters.get('/',      rolControlers.getAll);
rolRouters.get('/:id',   rolControlers.getById);
rolRouters.post('/crear',[
       check('codigo','El codigo es obligatorio')
       .notEmpty(),
       validarCampos,
       ],
       rolControlers.create);
rolRouters.put('/:id', rolControlers.updateById);

rolRouters.delete('/:id', rolControlers.deleteById);

export default rolRouters;