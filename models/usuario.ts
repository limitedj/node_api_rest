import {DataTypes, Model, Optional} from 'sequelize';
import db from '../db/connection';

//Modelo de Usuarios
interface UsuarioInstance extends Model {
    id:number;
    nombre:string;
    email:string;
    password:string;
    imagen:string;
    rol:string;
    estado:boolean;
    google:boolean;
}

const Usuario = db.define<UsuarioInstance>( 'usuario' , {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imagen: {
        type: DataTypes.STRING,
    },
    rol: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    google: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
} 
    //{
    // timestamps : false,
    //freezeTableName : true,  //How to make Sequelize use singular table names
    //tableName : 'usuarios',
    //}
);


// export interface UsuarioInput extends Optional<UsuarioInstance, 'id' > {};
// export interface UsuarioOuput extends Required<UsuarioInstance> {};
       
// Usuario.prototype.usuario = function() {
//     const { id, email, password, ...usuario } = this.prototype();
//     usuario.uid = id;
//     return usuario;
// }


export default Usuario;
