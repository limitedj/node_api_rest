import { Router } from 'express';
import { check } from 'express-validator';
import { login, revalidarToken, googleSingIn } from '../controllers/auth/auth';
import validarJWT from '../middlewares/validar-jwt';
import { validarCampos } from '../middlewares/validar_campos';

const router = Router();

router.post('/login',[
    check('email','El email es obligatorio y/o formato de no valido').isEmail(),
    check('password','El password es obligatorio').isLength({min:6}),
    validarCampos], 
    login);

    router.post('/login/google',[
        check('token','El token de google es obligatorio').not().isEmpty(),
        validarCampos], 
        googleSingIn);    

router.get('/renew', validarJWT, revalidarToken );

export default router;

