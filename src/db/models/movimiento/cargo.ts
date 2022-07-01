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
// import Usuario from "./usuario";



export interface CargoAttributes {
    id              : number;
    codigo_cargo ?  : string;
    nombre_cargo ?  : string;
    createdAt?      : Date;
    updatedAt?      : Date;
    deletedAt?      : Date;
};

export interface CargoInput extends Optional<CargoAttributes, 'id' > {}

export interface CargoOuput extends Required<CargoAttributes> {}


class Cargo extends Model<CargoAttributes, CargoInput> implements CargoAttributes {

        public id!: number;
        public codigo_cargo!: string;
        public nombre_cargo!: string;

        // timestamps!
        public readonly createdAt! : Date;
        public readonly updatedAt! : Date;
        public readonly deletedAt! : Date;

        // public getUsuarios!  : BelongsToManyGetAssociationsMixin<Usuario>; // ¡Tenga en cuenta las afirmaciones nulas!
        // public addUsuario!   : BelongsToManyAddAssociationMixin<Usuario, number>;
        // public hasUsuario!   : BelongsToManyHasAssociationMixin<Usuario, number>;
        // public countUsuarios!: BelongsToManyCountAssociationsMixin;
        // public createUsuario!: BelongsToManyCreateAssociationMixin<Usuario>;

}


Cargo.init({
    id:{
        type:DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    codigo_cargo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nombre_cargo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},{
    sequelize: db,
    paranoid:true,
    tableName: 'cargos'
});

export default Cargo;