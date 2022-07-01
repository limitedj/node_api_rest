import { Router } from "express";
import { check } from "express-validator";
import { getAll, getById } from '../../controllers/usuarios/menus_roles' 
import { validarCampos } from "../../middlewares/validar_campos";

const menuRolRouters = Router();

menuRolRouters.get('/',    getAll);
menuRolRouters.get('/:id', getById);
// menuRolRouters.post('/crear',[
//        check('codigo','El codigo es obligatorio').notEmpty(),
//        validarCampos,
//        ],
//        crearMenuRol);

// menuRolRouters.put('/:id', putMenuRol);

// menuRolRouters.delete('/:id', deleteMenuRol);

export default menuRolRouters;