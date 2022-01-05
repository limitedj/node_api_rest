interface Rol {
    id              : number;
    codigo ?        : string;
    descripcion ?   : string;
    estado ?        : boolean;
    createdAt       : Date;
    updatedAt       : Date;
    deletedAt?      : Date;

}

export default Rol;