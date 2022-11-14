import { DataTypes, Model, InferAttributes, InferCreationAttributes, Optional, 
    CreationOptional, Attributes, 
    BelongsToManyGetAssociationsMixin, 
    BelongsToManyAddAssociationMixin, 
    BelongsToManyHasAssociationMixin, 
    BelongsToManyCountAssociationsMixin, 
    BelongsToManyCreateAssociationMixin, 
    BelongsToManyCreateAssociationMixinOptions } from 'sequelize';

import db from "../../config";

interface RolAttributes {
               id  : BigInt;
           codigo  : string;
      descripcion? : string;
           estado  : boolean;
        createdAt? : Date;
        updatedAt? : Date;
        deletedAt? : Date;
}


export interface RolInput  extends Optional<RolAttributes, 'id' > {};

export interface RolOutput extends Required<RolAttributes> {};

// class Rol extends Model<InferAttributes<Rol, { omit: 'name' | 'projects' }>, InferCreationAttributes<Rol>> {

    // class Rol extends Model<RolAttributes, RolInput> {



class Rol extends Model<RolAttributes,RolInput> {

        declare id: BigInt;
        declare codigo: string;
        declare descripcion: string;;
        declare estado: boolean;

        // timestamps!
// createdAt can be undefined during creation
        declare readonly createdAt : Date;
// updatedAt can be undefined during creation
        declare readonly updatedAt : Date;
// deleteAt can be undefined during creation        
        declare readonly deletedAt : Date;

        // declare getUsuarios: BelongsToManyGetAssociationsMixin<Usuario>; // ¡Tenga en cuenta las afirmaciones nulas
        // declare addUsuario: BelongsToManyAddAssociationMixin<Usuario, number>;
        // declare hasUsuario: BelongsToManyHasAssociationMixin<Usuario, number>;
        // declare countUsuarios: BelongsToManyCountAssociationsMixin;
        // declare createUsuario: BelongsToManyCreateAssociationMixin<Usuario>;
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


//-------

