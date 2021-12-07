import { DataTypes, Model, Optional } from "sequelize";
import db from "../db/connection";



export interface MenuAttributes {
    id              : number;
    codigo ?        : string;
    descripcion ?   : string;
    estado ?        : boolean;
    createdAt?      : Date;
    updatedAt?      : Date;
    deletedAt?      : Date;

};

export interface MenuInput extends Optional<MenuAttributes, 'id' > {}

export interface MenuOuput extends Required<MenuAttributes> {}


class Menu extends Model<MenuAttributes, MenuInput> implements MenuAttributes {

        public id!: number
        public codigo!: string
        public descripcion!: string
        public estado!: boolean

        // timestamps!e
        public readonly createedAt?: Date;
        public readonly updaetedAt?: Date;
        public readonly deletedAt?: Date;

}


Menu.init({
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
    tableName: 'menus'
});

export default Menu;