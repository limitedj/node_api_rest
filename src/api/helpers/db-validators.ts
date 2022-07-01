import  Usuario  from "../../db/models/usuario/usuario";
import  Rol  from "../../db/models/usuario/rol";


export const esRolValido = async(rol = '')=>{
    const existeRol = await Rol.findOne({ where: { codigo: rol } });
    if(!existeRol){
        throw new Error(`El rol ${ rol } no está registrado en la BD`)
    }
};

export const existeEmail = async(email = '')=>{
    const existeEmail = await Usuario.findOne({ where: { email: email } });
    if(existeEmail){
        throw new Error(`El email ${email} ya esta registrado en la base de datos`);
    }
};

export const existeId = async(id:number = 0)=>{
    const existeId = await Usuario.findOne({ where: { id: id } });
    if(existeId){
        throw new Error(`El id ${id} ya esta registrado en la base de datos`);
    }
};

export const exiteUsuarioPorId = async(id:number = 0)=>{
    const existeId = await Usuario.findOne({ where: { id: id } });
    if(!existeId){
        throw new Error(`El usuario con el id ${id} no existe en la base de datos`);
    }
};

