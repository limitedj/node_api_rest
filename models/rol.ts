import { DataTypes, Model, Optional } from "sequelize";
import db from "../db/connection";
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

        public id!: number
        public codigo!: string
        public descripcion!: string
        public estado!: boolean

        // timestamps!e
        public readonly createedAt?: Date;
        public readonly updaetedAt?: Date;
        public readonly deletedAt?: Date;

}


Rol.init({
    id:{
        type:DataTypes.INTEGER.UNSIGNED,
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

export default Rol;