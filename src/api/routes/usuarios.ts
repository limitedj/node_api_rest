import { Router } from 'express';
import { check } from 'express-validator';
import {getAll, getById, create, updateById, deleteById }  from '../controllers/usuario';
import { validarCampos } from '../middlewares/validar_campos';
import { existeEmail, 
         esRolValido, 
         exiteUsuarioPorId} from '../helpers/db-validators';
import validarJWT from '../middlewares/validar-jwt';
import { esAdminRole } from '../middlewares/validar-roles';


const usuarioRouter = Router();

usuarioRouter.get('/',          getAll);
//router.get('/',          getUsuariosPag);
usuarioRouter.get('/:id',       getById);
usuarioRouter.post('/crear',[
       validarJWT,
    //    esAdminRole,
       check('nombre','El nombre es obligatorio').notEmpty(),
 //    check('email','El email es obligatorio').normalizeEmail().isEmail().notEmpty(),
       check('password','El password es obligatorio').notEmpty(),
       check('password','El password debe tener mas de 6 digitos').isLength({min:6}),
    //    check('rol','el rol no exite en la base de datos').notEmpty().custom(esRolValido),
       check('email','inconveniente con el email').notEmpty().custom(existeEmail).isEmail(), 
       validarCampos],
       create);

       usuarioRouter.put('/:id',[
    // check('password','El password debe tener mas de 6 digitos').isLength({min:6}),
    // check('id').custom(existeId),    
    check('rol').notEmpty().custom(esRolValido),
    // check('email').notEmpty().custom(existeEmail).isEmail(),

    validarCampos], updateById);

usuarioRouter.delete('/:id',[
               validarJWT,
               esAdminRole,
               check('id','no es un id valido').notEmpty(),
               check('id').custom(exiteUsuarioPorId),
               validarCampos
               ],
               deleteById);

export default usuarioRouter;


