import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../../middlewares/validar_campos";
import { crearUsuariosRoles, deleteUsuariosRoles, getUsuarioRol, getUsuariosRoles, putUsuariosRoles } from '../../controllers/usuarios/usuario_rol';

const usuarioRolrouters = Router();

usuarioRolrouters.get('/',    getUsuariosRoles);
usuarioRolrouters.get('/:id', getUsuarioRol);
// router.post('/crear',[
//        check('usuario_id','El usuario_id es obligatorio').notEmpty(),
//        check('rol_id','el rol_id es obligatorio').notEmpty(),
//        validarCampos,
//        ],
//        crearUsuariosRoles);
// router.put('/:id', putUsuariosRoles);

// router.delete('/:id', deleteUsuariosRoles);

export default usuarioRolrouters;