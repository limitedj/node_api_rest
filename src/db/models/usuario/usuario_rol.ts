import {  DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, Attributes, Optional } 
from "sequelize";
import db from "../../config";

interface UsuarioRolAttributes {
    id: BigInt;
    usuario_id: number;
    rol_id:     number;
    estado:     boolean;
    createdAt? : Date;
    updatedAt? : Date;
    deletedAt? : Date;
}

export interface UsuarioRolInput  extends Optional<UsuarioRolAttributes, 'id' > {};

export interface UsuarioRolOutput extends Required<UsuarioRolAttributes> {};

class UsuarioRol extends Model<UsuarioRolAttributes, UsuarioRolInput > {
    
    declare id: BigInt;
    declare usuario_id: number;
    declare rol_id: number;
    declare estado: boolean;

    // timestamps!
    // createdAt can be undefined during creation
    declare readonly createdAt : Date;
    declare readonly updatedAt : Date;
    // updatedAt can be undefined during creation
    declare readonly deletedAt : Date;
    // deleteAt can be undefined during creation        

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



// import {  DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, Attributes, Optional } 
// from "sequelize";
// import db from "../../config";


// class UsuarioRol extends Model<InferAttributes<UsuarioRol>, InferCreationAttributes<UsuarioRol>> {
    
//     declare id: CreationOptional<BigInt>;
//     declare usuario_id: number;
//     declare rol_id: number;
//     declare estado: boolean;

//     // timestamps!
//     // createdAt can be undefined during creation
//     declare readonly createdAt : CreationOptional<Date>;
//     declare readonly updatedAt : CreationOptional<Date>;
//     // updatedAt can be undefined during creation
//     declare readonly deletedAt : CreationOptional<Date>;
//     // deleteAt can be undefined during creation        

// }

// UsuarioRol.init({
//     id:{
//         type:DataTypes.BIGINT,
//         autoIncrement: true,
//         primaryKey: true,
//     },
//     usuario_id:{
//         type: DataTypes.BIGINT,
//         allowNull: false,
//     },
//     rol_id: {
//         type: DataTypes.BIGINT,
//         allowNull: false,
//     },
//     estado: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: true,
//     },
//     createdAt: {type: DataTypes.DATE, allowNull: true},
//     updatedAt: {type: DataTypes.DATE, allowNull: true},
//     deletedAt: {type: DataTypes.DATE, allowNull: true}
// },{
//     sequelize: db,
//     paranoid:true,
//     tableName:'usuarios_roles'
// });

// export interface UsuarioRolInput extends Optional<Attributes<UsuarioRol>, 'id'> {};

// export interface UsuarioRolOutput extends Attributes<UsuarioRol> {};

// export default UsuarioRol;