import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';

import jwt from 'jsonwebtoken';
import Usuario from '../../db/models/usuario/usuario';


const validarJWT = async(req:any, res:Response, next:NextFunction ) => {

    const token = req.header( 'x-token' ) || '' ;

    console.log(`Aqui debe mostrar el toKen = ${token}`);

    if( !token  ) {
        return res.status(401).json({
            ok: false,
            msg: `error en el token (validar JWT)`
        });
    }

    try {

        const { uid, nombre } = <JwtPayload>jwt.verify( token, process.env.SECRETORPRIVATEKEY! ) ;
        req.uid  = uid;
        req.nombre = nombre;
        console.log(uid,nombre);

        const usuario = await Usuario.findByPk(uid);
        
        //Verificar si el usuario que solicita el servicio existe en la BD

        if(!usuario){
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe en la BD'
            });
        }

        // Verificar si el uid tiene estado en true

        if(!usuario?.estado){
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado false'
            });
        }


        next();

    } catch (error) {
        return res.status(401).json({
            msg: 'Token no válido'
        });
    }
    // TODO OK!
 
    }
    
export default validarJWT;

