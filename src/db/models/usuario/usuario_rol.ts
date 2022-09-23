import {  DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, Attributes, Optional } 
from "sequelize";
import db from "../../config";

import Rol from "./rol";
import Usuario from './usuario';



export interface UsuarioRolInput extends Optional<Attributes<UsuarioRol>, 'id'> {};

export interface UsuarioRolOutput extends Attributes<UsuarioRol> {};

class UsuarioRol extends Model<InferAttributes<UsuarioRol>, InferCreationAttributes<UsuarioRol>> {

        declare id: CreationOptional<BigInt>;
        declare usuario_id: number;
        declare rol_id: number;
        declare estado: boolean;

        // timestamps!
// createdAt can be undefined during creation
        declare readonly createdAt : CreationOptional<Date>;
// updatedAt can be undefined during creation
        declare readonly updatedAt : CreationOptional<Date>;
// deleteAt can be undefined during creation        
        declare readonly deletedAt : CreationOptional<Date>;

}

UsuarioRol.init({
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
    },
    createdAt: {type: DataTypes.DATE, allowNull: true},
    updatedAt: {type: DataTypes.DATE, allowNull: true},
    deletedAt: {type: DataTypes.DATE, allowNull: true}
},{
    sequelize: db,
    paranoid:true,
    tableName:'usuarios_roles'
});

export default UsuarioRol;