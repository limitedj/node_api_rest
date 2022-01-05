import { Router } from "express";
import { check } from "express-validator";
import { getAll, getById, updateById, deleteById, create } from "../controllers/menus";
import { validarCampos } from "../middlewares/validar_campos";

const router = Router();

router.get('/',    getAll);
router.get('/:id', getById);
router.post('/crear',[
       check('codigo','El codigo es obligatorio').notEmpty(),
       validarCampos,
       ],
       create);
router.put('/:id', updateById);

router.delete('/:id', deleteById);

export default router;