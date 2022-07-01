import {     
    Sequelize,
    Model,
    ModelDefined,
    DataTypes,
    BelongsToManyGetAssociationsMixin,
    BelongsToManyAddAssociationMixin,
    BelongsToManyHasAssociationMixin,
    Association,
    BelongsToManyCountAssociationsMixin,
    BelongsToManyCreateAssociationMixin,
    Optional 
} from "sequelize";
import db from "../../config";
import Usuario from "./usuario";



export interface RolAttributes {
    id              : number;
    codigo ?        : string;
    descripcion ?   : string;
    estado ?        : boolean;
    createdAt?      : Date;
    updatedAt?      : Date;
    deletedAt?      : Date;

};

export interface RolInput extends Optional<RolAttributes, 'id' > {}

export interface RolOuput extends Required<RolAttributes> {}


class Rol extends Model<RolAttributes, RolInput> implements RolAttributes {

        public id!: number;
        public codigo!: string;
        public descripcion!: string;
        public estado!: boolean;

        // timestamps!
        public readonly createdAt! : Date;
        public readonly updatedAt! : Date;
        public readonly deletedAt! : Date;

        public getUsuarios!: BelongsToManyGetAssociationsMixin<Usuario>; // ¡Tenga en cuenta las afirmaciones nulas!
        public addUsuario!: BelongsToManyAddAssociationMixin<Usuario, number>;
        public hasUsuario!: BelongsToManyHasAssociationMixin<Usuario, number>;
        public countUsuarios!: BelongsToManyCountAssociationsMixin;
        public createUsuario!: BelongsToManyCreateAssociationMixin<Usuario>;

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
    }
},{
    sequelize: db,
    paranoid:true,
    tableName: 'roles'
});

// Rol.belongsToMany(Usuario,{
//     through:UsuarioRol, 
//     foreignKey:'rol_id'
// });

// Rol.belongsToMany(Menu,{
//     through:MenuRol, 
//     foreignKey:'rol_id'
// });

export default Rol;