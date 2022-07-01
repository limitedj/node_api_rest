import { Router } from "express"; 

import authRouters from "./usuario/auth";
import menuRouters from './usuario/menus';
import menuRolRouters from "./usuario/menus_roles";
import rolRouters from "./usuario/roles";
import usuarioRouter from './usuario/usuarios';
import usuarioRolrouters from "./usuario/usuarios_roles";


const pathsUsuario = {
    auth:           '/auth',
    usuarios:       '/usuario',
    roles:          '/rol',
    menus:          '/menu',
    usuarios_roles: '/usuario_rol',
    menus_roles:    '/menu_rol',
}  

const router = Router();

router.use(pathsUsuario.auth,authRouters);
router.use(pathsUsuario.menus,menuRouters);
router.use(pathsUsuario.usuarios,usuarioRouter);
router.use(pathsUsuario.roles,rolRouters);
router.use(pathsUsuario.usuarios_roles,usuarioRolrouters);
router.use(pathsUsuario.menus_roles,menuRolRouters);

export default router


