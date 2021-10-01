import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';

interface MenuInstance extends Model {
    id:number;
    codigo:string;
    descripcion:string;
    menu_id:number;
    url:string;
}
//Modelo de Menu

const Menu = db.define<MenuInstance>( 'menus' , {
    id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
    },
    codigo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true
    },
    id_menu: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    url: {
        type: DataTypes.STRING,
        allowNull: true
    },
},
{
// timestamps : false,
freezeTableName : true,  //How to make Sequelize use singular table names
tableName : 'roles',
}
);

export default Menu;

// id integer GENERATED ALWAYS AS IDENTITY NOT NULL,
// codigo character varying NOT NULL,
// menu_id integer,
// url character varying,