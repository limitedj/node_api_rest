interface Usuario {
    id          : number;
    nombre?     : string;
    apellido?   : string;
    email?      : string;
    password?   : string;
    imagen?     : string;
    estado?     : boolean;
    createdAt   : Date;
    updatedAt   : Date;
    deletedAt?  : Date;
   
}

export default Usuario;



