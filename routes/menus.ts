import { Router } from "express";
import { check } from "express-validator";
import { crearMenu, deleteMenu, getMenu, getMenus, putMenu } from "../controllers/menus";
import { validarCampos } from "../middlewares/validar_campos";

const router = Router();

router.get('/',    getMenus);
router.get('/:id', getMenu);
router.post('/crear',[
       check('codigo','El codigo es obligatorio').notEmpty(),
       validarCampos,
       ],
       crearMenu);
router.put('/:id', putMenu);

router.delete('/:id', deleteMenu);

export default router;