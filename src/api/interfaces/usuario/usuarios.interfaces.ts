interface Usuario {
    id          : BigInt;
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

// interface RolDTO {
//     id              : number;
//     codigo ?        : string;
//     descripcion ?   : string;
//     estado ?        : boolean;
//     createdAt       : Date;
//     updatedAt       : Date;
//     deletedAt?      : Date;
// }

// export interface UsuarioDTO {
//     id          : number;
//     nombre?     : string;
//     apellido?   : string;
//     email?      : string;
//     password?   : string;
//     imagen?     : string;
//     estado?     : boolean;
//     rol?        : RolDTO[];
//     createdAt   : Date;
//     updatedAt   : Date;
//     deletedAt?  : Date;
   
// }

// type Genre = 'Post-punk' | 'Trip-hop' | 'Rock' | 'Rap' | 'Electronic' | 'Pop';

// interface TrackDTO {
//   number: number;
//   name: string;
//   length: string;
// }

// type TrackCollectionDTO = TrackDTO[];

// // Vinyl view model / DTO, this is the format of the response
// interface VinylDTO {
//   albumName: string;
//   label: string;
//   country: string;
//   yearReleased: number;
//   genres: Genre[];
//   artistName: string;
//   trackList: TrackCollectionDTO;
// }
