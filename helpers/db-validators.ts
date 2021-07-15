import Role from '../models/roles';
import Usuario from '../models/usuario';

export const esRolValido = async(rol = '')=>{
    const existeRol = await Role.findOne({ rol });
    if(!existeRol){
        throw new Error(`El rol ${ rol } no está registrado en la BD`)
    }
};

export const esEmailValido = async(email = '')=>{
    const existeEmail = await Usuario.findOne({ email });
    if(existeEmail){
        throw new Error(`El email ${email} ya esta registrado en la base de datos`);
    }
};

 // const existeEmail = await Usuario.findOne({
        //     where: {
        //         email: body.email
        //     }
        // });

        // if (existeEmail) {
        //     return res.status(400).json({
        //         msg: 'Ya existe el usuario con el email ' + body.email
        //     });
        // }


