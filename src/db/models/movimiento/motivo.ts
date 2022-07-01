
// import {     
//     Sequelize,
//     Model,
//     ModelDefined,
//     DataTypes,
//     BelongsToManyGetAssociationsMixin,
//     BelongsToManyAddAssociationMixin,
//     BelongsToManyHasAssociationMixin,
//     Association,
//     BelongsToManyCountAssociationsMixin,
//     BelongsToManyCreateAssociationMixin,
//     Optional 
// } from "sequelize";
// import db from "../../config";
// // import Usuario from "./usuario";



// export interface MotivoAttributes {
//     id                      : number;
//     nombre_motivo           : string;
//     nombre_motivo_masculino : string;
//     nombre_motivo_femenino  : string;
//     motivo_legajo           : string;
//     numero_tipo_movimiento  : number;
//     codigo_motivo           : string;
//     incluir_en_informe      : boolean;
//     createdAt?              : Date;
//     updatedAt?              : Date;
//     deletedAt?              : Date;
// };

// export interface MotivoInput extends Optional<MotivoAttributes, 'id' > {}

// export interface MotivoOuput extends Required<MotivoAttributes> {}


// class Motivo extends Model<MotivoAttributes, MotivoInput> implements MotivoAttributes {

//         public id!: number;
//         public codigo_cargo!: string;
//         public nombre_cargo!: string;

//         // timestamps!
//         public readonly createdAt! : Date;
//         public readonly updatedAt! : Date;
//         public readonly deletedAt! : Date;

//         // public getUsuarios!  : BelongsToManyGetAssociationsMixin<Usuario>; // ¡Tenga en cuenta las afirmaciones nulas!
//         // public addUsuario!   : BelongsToManyAddAssociationMixin<Usuario, number>;
//         // public hasUsuario!   : BelongsToManyHasAssociationMixin<Usuario, number>;
//         // public countUsuarios!: BelongsToManyCountAssociationsMixin;
//         // public createUsuario!: BelongsToManyCreateAssociationMixin<Usuario>;

// }


// Motivo.init({
//     id:{
//         type:DataTypes.BIGINT,
//         autoIncrement: true,
//         primaryKey: true,
//     },
//     codigo_motivo: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     nombre_motivo: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     nombre_motivo_masculino: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },    
//     nombre_motivo_fememnino: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     motivo_legajo: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     incluir_en_informe: {
//         type: DataTypes.BOOLEAN,
//         allowNull: false,
//     },
// },{
//     sequelize: db,
//     paranoid:true,
//     tableName: 'cargos'
// });

// export default Motivo;