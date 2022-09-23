interface Rol {
    id              : BigInt;
    codigo ?        : string;
    descripcion ?   : string;
    estado ?        : boolean;
    createdAt       : Date;
    updatedAt       : Date;
    deletedAt?      : Date;

}



export default Rol;