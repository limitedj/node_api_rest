import { Router } from "express";
import { check } from "express-validator";
import { crearRol, deleteRol, getRol, getRoles, getSmallRoles, putRol } from "../controllers/roles";
import { validarCampos } from "../middlewares/validar_campos";

const router = Router();

router.get('/small', getSmallRoles);
router.get('/',      getRoles);
router.get('/:id',   getRol);
router.post('/crear',[
       check('codigo','El codigo es obligatorio').notEmpty(),
       validarCampos,
       ],
       crearRol);
router.put('/:id', putRol);

router.delete('/:id', deleteRol);

export default router;