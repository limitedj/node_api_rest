import { DataTypes, Model, Optional } from "sequelize";
import db from "../db/connection";


export interface UsuarioAttributes {
    id          : number;
    nombre ?    : string;
    apellido ?  : string;
    email ?     : string;
    password ?  : string;
    imagen ?    : string;
    estado ?    : boolean;
    createdAt?  : Date;
    updatedAt?  : Date;
    deletedAt?  : Date;

};

export interface UsuarioInput extends Optional<UsuarioAttributes, 'id' > {}

export interface UsuarioOuput extends Required<UsuarioAttributes> {}


class Usuario extends Model<UsuarioAttributes, UsuarioInput> implements UsuarioAttributes {

        public id!: number
        public nombre!: string
        public apellido!: string
        public email!: string
        public password!: string
        public imagen!: string
        public estado!: boolean

        // timestamps!e
        public readonly createedAt?: Date;
        public readonly updaetedAt?: Date;
        public readonly deletedAt?: Date;

}


Usuario.init({
    id:{
        type:DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    apellido: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: true,
    }
},{
    sequelize: db,
    paranoid:true,
    tableName: 'usuarios'
});

export default Usuario;