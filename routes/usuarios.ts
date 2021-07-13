import {Router} from 'express';
import { check } from 'express-validator';
import { getUsuario, getUsuarios, crearUsuario, putUsuario, deleteUsuario, loginUsuario } from '../controllers/usuarios';


const router = Router();

router.get('/',       getUsuarios);
router.get('/:id',    getUsuario);
router.post('/auth',[
    check('email','El email es obligatorio').isEmail().notEmpty(),
    check('password','El password debe tener mas de 6 digitos').isLength({min:6}),
    ], 
    loginUsuario);
router.post('/crear',[
       check('nombre','El nombre es obligatorio'),
       check('email','El email es obligatorio').normalizeEmail().isEmail().notEmpty(),
       check('password','El password debe tener mas de 6 digitos').isLength({min:6}),
       ],
       crearUsuario);
router.put('/:id', putUsuario);

router.delete('/:id', deleteUsuario);

export default router;