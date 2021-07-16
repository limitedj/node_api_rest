import Role from '../models/role';
import Usuario from '../models/usuario';

export const esRolValido = async(rol = '')=>{
    const existeRol = await Role.findOne({ rol });
    if(!existeRol){
        throw new Error(`El rol ${ rol } no está registrado en la BD`)
    }
};


export const existeEmail = async(email:String = '')=>{
    const existeEmail = await Usuario.findOne({ email });
    if(existeEmail){
        throw new Error(`El email ${email} ya esta registrado en la base de datos`);
    }
};



