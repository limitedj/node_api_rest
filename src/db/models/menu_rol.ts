import { DataTypes, Model, Optional } from "sequelize";
import Rol from "./rol";
import Menu from './menu';
import db from "../config";


export interface MenuRolAttributes {
    id              : number;
    menu_id ?    : number;
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
        
        // timestamps!
        public readonly createdAt! : Date;
        public readonly updatedAt! : Date;
        public readonly deletedAt! : Date;

}

MenuRol.init({
    id:{
        type:DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    menu_id:{
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
    }
},{
    sequelize: db,
    paranoid:true,
    tableName:'menus_roles'
});

Menu.belongsToMany(Rol,{
    through:MenuRol, 
    foreignKey:'menu_id'
});
Rol.belongsToMany(Menu,{
    through:MenuRol, 
    foreignKey:'rol_id'
});

export default MenuRol;