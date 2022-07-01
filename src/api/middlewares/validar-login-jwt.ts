import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import Usuario from '../../db/models/usuario/usuario';



const validarJWT = async(req:any, res:Response, next:NextFunction ) => {

        const token = req.header('x-token');
    
        if ( !token ) {
            return res.status(401).json({
                msg: 'No hay token en la petición'
            });
        }
    
        try {
            
            const  { uid } = <JwtPayload>jwt.verify( token, process.env.SECRETORPRIVATEKEY! )
            
            // leer el usuario que corresponde al uid
            const usuario = await Usuario.findByPk( uid );
    
            if( !usuario ) {
                return res.status(401).json({
                    msg: 'Token no válido - usuario no existe DB'
                })
            }
    
            // Verificar si el uid tiene estado true
            if ( !usuario.estado ) {
                return res.status(401).json({
                    msg: 'Token no válido - usuario con estado: false'
                })
            }
            
            // req.usuario = usuario;
            
            req.usuario = usuario;
            
            next();
    
        } catch (error) {
    
            console.log(error);
            res.status(401).json({
                msg: 'Token no válido'
            })
        }
    
    }
    

export default validarJWT;

