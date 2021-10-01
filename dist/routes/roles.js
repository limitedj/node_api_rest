"use strict";
// import { Router } from 'express';
// import { check } from 'express-validator';
// import { getUsuario, getUsuarios, crearUsuario, putUsuario, deleteUsuario, login } from '../controllers/usuarios';
// import { validarCampos } from '../middlewares/validar_campos';
// import Role from '../models/role';
// const router = Router();
// router.get('/',       getUsuarios);
// router.get('/:id',    getUsuario);
// router.post('/auth',[
//     check('email','El email es obligatorio').isEmail().notEmpty(),
//     check('password','El password debe tener mas de 6 digitos').isLength({min:6}),
//     validarCampos,
//     ], 
//     login);
// router.post('/crear',[
//        check('nombre','El nombre es obligatorio').notEmpty(),
//        check('email','El email es obligatorio').normalizeEmail().isEmail().notEmpty(),
//        check('password','El password es obligatorio').notEmpty(),
//        check('password','El password debe tener mas de 6 digitos').isLength({min:6}),
//        check('id').custom(async(id = '')=>{
//         const existeRol = await Role.findByPk(id);
//            if(!existeRol) {
//             throw new Error(`El rol ${ id } no está registrado en la BD`)
//            }
//        }),
//        validarCampos,
//        ],
//        crearUsuario);
// router.put('/:id', putUsuario);
// router.delete('/:id', deleteUsuario);
// export default router;
//# sourceMappingURL=roles.js.map