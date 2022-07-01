import { Router } from "express";
import { check } from "express-validator";
import * as menuControler from '../../../api/controllers/usuarios/menus';
import { validarCampos } from "../../middlewares/validar_campos";

const menuRouters = Router();

menuRouters.get('/', menuControler.getAll);
menuRouters.get('/:id', menuControler.getById);
menuRouters.post('/crear', [
            check('codigo', 'El codigo es obligatorio')
            .notEmpty(),
            validarCampos,
            ],
            menuControler.create);
menuRouters.put('/:id', menuControler.updateById);

menuRouters.delete('/:id', menuControler.deleteById);

export default menuRouters;