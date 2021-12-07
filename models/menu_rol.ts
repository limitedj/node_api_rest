import { DataTypes, Model, Optional } from "sequelize";
import db from "../db/connection";
import Rol from './rol';
import Menu from "./menu";


export interface MenuRolAttributes {
    id              : number;
    usuario_id ?    : number;
    rol_id ?        : number;
    estado ?        : boolean;
    createdAt?      : Date;
    updatedAt?      : Date;
    deletedAt?      : Date;

};

export interface MenuRolInput extends Optional<MenuRolAttributes, 'id' > {}

export interface MenuRolOuput extends Required<MenuRolAttributes> {}


class MenuRol extends Model<MenuRolAttributes, MenuRolInput> implements MenuRolAttributes {

        public id!: number
        public usuario_id!: number
        public rol_id!: number
        public estado!: boolean

        // timestamps!e
        public readonly createedAt?: Date;
        public readonly updaetedAt?: Date;
        public readonly deletedAt?: Date;

}

MenuRol.init({
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
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: true,
    }
},{
    sequelize: db,
    paranoid:true,
    tableName:'menus_roles'
});

Menu.belongsToMany(Rol,{through:MenuRol, foreignKey:'Menu_id'});

Rol.belongsToMany(Menu,{through:MenuRol, foreignKey:'rol_id'});

export default MenuRol;