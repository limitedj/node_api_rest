import { Router } from 'express';
import { check } from 'express-validator';
import { getUsuario, 
         getUsuarios, 
         crearUsuario, 
         putUsuario, 
         deleteUsuario } from '../controllers/usuarios';
import { validarCampos } from '../middlewares/validar_campos';
import { existeId, 
         existeEmail, 
         esRolValido, 
         exiteUsuarioPorId} from '../helpers/db-validators';
import validarJWT from '../middlewares/validar-jwt';
import { esAdminRole } from '../middlewares/validar-roles';

const router = Router();

router.get('/',          getUsuarios);
//router.get('/',          getUsuariosPag);
router.get('/:id',       getUsuario);
router.post('/crear',[
       validarJWT,
    //    esAdminRole,
       check('nombre','El nombre es obligatorio').notEmpty(),
 //    check('email','El email es obligatorio').normalizeEmail().isEmail().notEmpty(),
       check('password','El password es obligatorio').notEmpty(),
       check('password','El password debe tener mas de 6 digitos').isLength({min:6}),
       check('rol','el rol no exite en la base de datos').notEmpty().custom(esRolValido),
       check('email','inconveniente con el email').notEmpty().custom(existeEmail).isEmail(), 
       validarCampos],
       crearUsuario);

router.put('/:id',[
    check('password','El password debe tener mas de 6 digitos').isLength({min:6}),
    check('id').custom(existeId),    
    check('rol').notEmpty().custom(esRolValido),
    check('email').notEmpty().custom(existeEmail).isEmail(),

    validarCampos], putUsuario);

router.delete('/:id',[
               validarJWT,
               esAdminRole,
               check('id','no es un id valido').notEmpty(),
               check('id').custom(exiteUsuarioPorId),
               validarCampos
               ],
               deleteUsuario);

export default router;


