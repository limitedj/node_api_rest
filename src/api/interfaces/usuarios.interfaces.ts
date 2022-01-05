interface resUsuario {
    id          : number;
    nombre?     : string;
    apellido?   : string;
    email?      : string;
    password?   : string;
    imagen?     : string;
    estado?     : boolean;
    rol?        : number;
    // rol?:{
    //      id?:string;
    //      }
    createdAt   : Date;
    updatedAt   : Date;
    deletedAt?  : Date;
   
}

export default resUsuario;



