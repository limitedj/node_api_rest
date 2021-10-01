import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';

interface Rol_menuInstance extends Model {
    id:number;
    rol_id:number;
    menu_id:number;
    descripcion:string;
}
//Modelo de Roles

const Rol_menu = db.define<Rol_menuInstance>( 'roles_menus' , {
    id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
    },
    
    rol_id: {
        type: DataTypes.NUMBER,
        allowNull: false
    },

    menu_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },

},
{
// timestamps : false,
freezeTableName : true,  //How to make Sequelize use singular table names
tableName : 'roles_menus',
}
);

export default Rol_menu;