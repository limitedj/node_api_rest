import { Router } from 'express';
import { check } from 'express-validator';
import { login, revalidarToken } from '../controllers/auth';
import validarJWT from '../middlewares/validar-jwt';
import { validarCampos } from '../middlewares/validar_campos';

const router = Router();

router.post('/login',[
    check('email','El email es obligatorio y/o formato de no valido').isEmail(),
    check('password','El password es obligatorio').isLength({min:6}),
    validarCampos], 
    login);

router.get('/renew', validarJWT, revalidarToken );

export default router;

