import { DataTypes, Model, InferAttributes, InferCreationAttributes, Optional, CreationOptional, Attributes } from 'sequelize';

import db from "../../config";
import Usuario from './usuario';
import UsuarioRol from './usuario_rol';

export interface RolInput  extends Optional<Attributes<Rol>, 'id'> {};

export interface RolOutput extends Attributes<Rol> {};

// class Rol extends Model<InferAttributes<Rol, { omit: never; }>, InferCreationAttributes<Rol>> {

class Rol extends Model<InferAttributes<Rol>, InferCreationAttributes<Rol>> {

        declare id: CreationOptional<BigInt>;
        declare codigo: string;
        declare descripcion: string;
        declare estado: boolean;

        // timestamps!
// createdAt can be undefined during creation
        declare readonly createdAt : CreationOptional<Date>;
// updatedAt can be undefined during creation
        declare readonly updatedAt : CreationOptional<Date>;
// deleteAt can be undefined during creation        
        declare readonly deletedAt : CreationOptional<Date>;

        // public getUsuarios!: BelongsToManyGetAssociationsMixin<Usuario>; // ¡Tenga en cuenta las afirmaciones nulas!
        // public addUsuario!: BelongsToManyAddAssociationMixin<Usuario, number>;
        // public hasUsuario!: BelongsToManyHasAssociationMixin<Usuario, number>;
        // public countUsuarios!: BelongsToManyCountAssociationsMixin;
        // public createUsuario!: BelongsToManyCreateAssociationMixin<Usuario>;

}


Rol.init({
    id:{
        type:DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    codigo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: true,
    },
    createdAt: {type: DataTypes.DATE, allowNull: true},
    updatedAt: {type: DataTypes.DATE, allowNull: true},
    deletedAt: {type: DataTypes.DATE, allowNull: true}
},{
    sequelize: db,
    paranoid:true,
    tableName: 'roles'
});


export default Rol;