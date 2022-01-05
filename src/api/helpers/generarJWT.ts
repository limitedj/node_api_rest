import jwt from 'jsonwebtoken';

// interface UserPayload {
//     id: string;
//   }
//   interface JwtExpPayload {
//     expiresIn: string;
//     exp: number;
//   }

const generarJWT = (uid:string = '', nombre:string ) => {

    return new Promise((resolve,reject)=>{

        const payload = { uid, nombre };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY!, {
                expiresIn: '4h'
        }, (err, token)=>{

            if ( err ) {
                console.log(err);
                reject('No se pudo generar el token')
            } else {
                resolve( token );
            }
        })

    })

}

export default generarJWT;