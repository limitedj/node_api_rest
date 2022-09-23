import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, Attributes, Optional } from 'sequelize';
import Rol from "./rol";
import Menu from './menu';
import db from "../../config";


export interface MenuRolInput extends Optional<Attributes<MenuRol>, 'id'> {};

export interface MenuRolOutput extends Attributes<MenuRol> {};

class MenuRol extends Model<InferAttributes<MenuRol>, InferCreationAttributes<MenuRol>> {

        declare id: CreationOptional<BigInt>
        declare menu_id: bigint
        declare rol_id: bigint
        declare estado: boolean
        
        // timestamps!
// createdAt can be undefined during creation
        declare readonly createdAt : CreationOptional<Date>;
// updatedAt can be undefined during creation
        declare readonly updatedAt : CreationOptional<Date>;
// deleteAt can be undefined during creation        
        declare readonly deletedAt : CreationOptional<Date>;

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
    },
    createdAt: {type: DataTypes.DATE, allowNull: true},
    updatedAt: {type: DataTypes.DATE, allowNull: true},
    deletedAt: {type: DataTypes.DATE, allowNull: true}
},{
    sequelize: db,
    paranoid:true,
    tableName:'menus_roles'
});

export default MenuRol;