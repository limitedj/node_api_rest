interface Usuario_Rol {
    id?         : number;
    nombre?     : string;
    apellido?   : string;
    email?      : string;
    password?   : string;
    imagen?     : string;
    estado?     : boolean;
    rol?        : string;
    createdAt   : Date;
    updatedAt   : Date;
    deletedAt?  : Date;
   
}

export default Usuario_Rol;



