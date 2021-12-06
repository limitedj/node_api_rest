export interface resUsuario {
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    imagen: string;
    estado: boolean;
    google: boolean;
    rol:{
        id:string;
    }
}
