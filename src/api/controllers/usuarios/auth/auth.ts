import { Request, Response } from 'express';
// import Usuario from '../../../db/models'; 
import bcryptjs from 'bcryptjs';
import generarJWT from '../../../helpers/generarJWT';
import { Usuario } from '../../../../db/models/usuario';
import googleVerify from '../../../helpers/google.verify';

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
    
        // Validar contraseña
        console.log(usuario.password);
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

export const renewToken = async(req:any, res:Response) => {

    const { uid } = req;

    // Leer la base de datos
    const usuario = await Usuario.findByPk(uid);

    // Generar el JWT
    const token = await generarJWT( uid, usuario?.nombre! );

    console.log(`${req.uid}  ${req.nombre} nuevo token generado = ${token}`);

    if( usuario ){
    return res.json({
        ok : true,
        token,
          nombre : usuario.nombre,
        apellido : usuario.apellido,
           email : usuario.email,
          imagen : usuario.imagen,
          google : usuario.google,
              id : usuario.id
    })    
  }
}

export const googleSingIn = async(req:Request, res:Response)=>{

    const googleToken = req.body.token;

    console.log(` ESTE ES GOOGLE TOKEN "${googleToken}"`);
    // console.log( JSON.stringify({ token : req.body.token }));

    try {

        const {name, email, picture }  = await googleVerify(googleToken);

        // verificar si ya existe el email
        console.log(name,email,picture);

        const usuarioDB =  await Usuario.findOne({
            where: {
                email: email
            }
        });

        let usuario:Usuario;

        if( !usuarioDB ){
        // si no existe un usuario
        usuario = new Usuario({
                  nombre: name,
                  apellido: '',
                  email,
                  password:'@@@',
                  imagen: picture,
                  google: true,
                  estado: true,
                  
        });
        console.log('no existe en la base de datos');
        
        } else {
            // existe usuario
            usuario = usuarioDB;
            usuario.google = true;
            usuario.password = '@@@';
            console.log('ya existe en la base de datos');    
        }

        await usuario.save().catch( (error) => console.log(error) );

        const uid = (usuario.id).toString()

        const token = await generarJWT( uid, name );
        
        res.json({
            ok: true,
            token
        });

    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Error inesperado'

        })
        
    }

}

