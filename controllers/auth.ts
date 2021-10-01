import { Request, Response } from 'express';
import Usuario from '../models/usuario';
import bcryptjs from 'bcryptjs';
import generarJWT from '../helpers/generarJWT';



export const login = async (req:Request,res:Response) => {

   const { email, password} = req.body;

   try {
        // Verificar si el email existe
        const usuario =  await Usuario.findOne({where: {email: email}});

        if ( !usuario ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }
            
        // Si el usuario está activo
        if ( !usuario.estado ) {
            return res.status(400).json({
            msg: 'Usuario / Password no son correctos - estado: false'
            });
        }
    
        //Validar contraseña
        // console.log(usuario.password);
        const validPassword = bcryptjs.compareSync( password, usuario.password);
        if ( !validPassword ){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password: incorrecto'
            });
        }

       //Generar el JWT
       const uid = (usuario.id).toString()
       const token = await generarJWT( uid, usuario.nombre );
    //    console.log(usuario.password);
        res.json({
            ok:true,
            uid: usuario.id,
            nombre:usuario.nombre,
            email:usuario.email,
            token
        })        

        } catch (error) {
            res.json(500).json({ 
                msg: 'Hable con el Administrador'
            }); 
   }

}

export const revalidarToken = async(req:any, res:Response) => {

    const { uid } = req;

    // Leer la base de datos
    const usuario = await Usuario.findByPk(uid);

    // Generar el JWT
    const token = await generarJWT( uid, usuario?.nombre! );

    // const token = await generarJWT((req.uid), req.nombre);

    console.log(`${req.uid}  ${req.nombre} nuevo token generado = ${token}`);

    return res.json({
        ok:true,
        msg: 'Renew',
        uid: usuario?.id,
        nombre:usuario?.nombre,
        email:usuario?.email,
        token
    })    
   
}

