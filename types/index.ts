import express from 'express';
import { Dialect } from 'sequelize/types';

declare global {
  namespace NodeJS {
     export  interface ProcessEnv {
            PORT:string;
            NODE_ENV: 'development' | 'production';
            DB_NOMBRE:string;
            DB_USER:string;
            DB_PASSWORD:string;
            DB_SERVER:string;
            DB_DIALECT: Dialect;
            DB_PORT: number;
            SECRETORPRIVATEKEY: string;
        }
    }
 }    

declare module "express-serve-static-core" {
    namespace Request {
       export interface Request {
            id      :number;
            nombre  :string;
            email   :string;
            password:string;
            imagen  :string;
            rol     :string;
            estado  :boolean;
            google  :boolean;
        }
      }
    }      

declare module "jsonwebtoken" {
    namespace jwtpayload {
      export  interface Payload {
            uid: string;
            nombre: string;
            // email: string;
            // role: string;
        }
    }
}    


//public class JwtPayload : System.Collections.Generic.Dictionary<string,object>    

//}

//  declare namespace Express {
//         enum Roles {
//             ADMIN = 'admin',
//             EMPLOYEE = 'employee',
//             MANAGER = 'manager',
//         }
    
//         interface RequestUsuario {
       
//             id:number;
//             nombre:string;
//             email:string;
//             password:string;
//             imagen:string;
//             rol:string;
//             estado:boolean;
//             google:boolean;
       
//         }
//         export interface Request {
//             usuario?: RequestUsuario;
//         }
//     }




// export interface User {
//     id: number;
//     dateCreated: number;
//     username: string;
//     password: string;
// }

// export interface Session {
//     id: number;
//     dateCreated: number;
//     username: string;
//     /**
//      * Timestamp indicating when the session was created, in Unix milliseconds.
//      */
//     issued: number;
//     /**
//      * Timestamp indicating when the session should expire, in Unix milliseconds.
//      */ 
//     expires: number;
// }

/**
 * Identical to the Session type, but without the `issued` and `expires` properties.
 */
// export type PartialSession = Omit<Session, "issued" | "expires">;

// export interface EncodeResult {
//     token: string,
//     expires: number,
//     issued: number
// }

// export type DecodeResult =
//     | {
//           type: "valid";
//           session: Session;
//       }
//     | {
//           type: "integrity-error";
//       }
//     | {
//           type: "invalid-token";
//       };

// export type ExpirationStatus = "expired" | "active" | "grace";