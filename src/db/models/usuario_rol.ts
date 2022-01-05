import { DataTypes, Model, Optional } from "sequelize";
import db from "../config";

import Rol from "./rol";
import Usuario from './usuario';


export interface UsuarioRolAttributes {
    id              : number;
    usuario_id ?    : number;
    rol_id ?        : number;
    estado ?        : boolean;
    createdAt?      : Date;
    updatedAt?      : Date;
    deletedAt?      : Date;

};

export interface UsuarioRolInput extends Optional<UsuarioRolAttributes, 'id' > {}

export interface UsuarioRolOuput extends Required<UsuarioRolAttributes> {}


class Usuario_Rol extends Model<UsuarioRolAttributes, UsuarioRolInput> implements UsuarioRolAttributes {

        public id!: number;
        public usuario_id!: number;
        public rol_id!: number;
        public estado!: boolean;

        // timestamps!
        public readonly createdAt! : Date;
        public readonly updatedAt! : Date;
        public readonly deletedAt! : Date;

}

Usuario_Rol.init({
    id:{
        type:DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    usuario_id:{
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    rol_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
},{
    sequelize: db,
    paranoid:true,
    tableName:'usuarios_roles'
});

Usuario.belongsToMany(Rol,{
    through:Usuario_Rol, 
    foreignKey:'usuario_id'
});

Rol.belongsToMany(Usuario,{
    through:Usuario_Rol, 
    foreignKey:'rol_id'
});



export default Usuario_Rol;