import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';

interface RolInstance extends Model {
    codigo:string;
    id_menu:number;
    descripcion:string;
}
//Modelo de Roles

const Rol = db.define<RolInstance>( 'roles' , {
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
},
{
// timestamps : false,
freezeTableName : true,  //How to make Sequelize use singular table names
tableName : 'roles',
}
);

export default Rol;