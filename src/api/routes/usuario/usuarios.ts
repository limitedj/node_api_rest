import { Router } from 'express';
import { check } from 'express-validator';
import { getAll, getById, create, updateById, deleteById }  from '../../controllers/usuarios/usuarios';
import { validarCampos } from '../../middlewares/validar_campos';
import { existeEmail, 
         esRolValido, 
         exiteUsuarioPorId} from '../../helpers/db-validators';
import validarJWT from '../../middlewares/validar-jwt';
import { esAdminRole } from '../../middlewares/validar-roles';


const usuarioRouters = Router();

usuarioRouters.get('/', getAll);
//router.get('/',          getUsuariosPag);
usuarioRouters.get('/:id', getById);
usuarioRouters.post('/crear',[
       validarJWT,
    //    esAdminRole,
       check('nombre','El nombre es obligatorio').notEmpty(),
       check('email','El email es obligatorio').normalizeEmail().isEmail().notEmpty().custom(existeEmail),
       check('password','El password es obligatorio').notEmpty(),
       check('password','El password debe tener mas de 6 digitos').isLength({min:6}),
      //  check('rol','el rol no exite en la base de datos').notEmpty().custom(esRolValido),
       validarCampos],
       create);
      //  
       usuarioRouters.put('/:id',[
    // check('id').custom(existeId),    
       check('rol').notEmpty().custom(esRolValido),

    validarCampos], updateById);

usuarioRouters.delete('/:id',[
               validarJWT,
               esAdminRole,
               check('id','no es un id valido').notEmpty(),
               check('id').custom(exiteUsuarioPorId),
               validarCampos
               ],
               deleteById);

export default usuarioRouters;


