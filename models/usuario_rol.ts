import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';

interface Usuario_rolInstance extends Model {
    id:number;
    usuario_id:number;
    rol_id:number;
    descripcion:string;
}
//Modelo de Roles

const usuario_rol = db.define<Usuario_rolInstance>( 'usuarios_roles' , {
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

    usuario_id: {
        type: DataTypes.NUMBER,
        allowNull: false
    },

    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },

},
{
// timestamps : false,
freezeTableName : true,  //How to make Sequelize use singular table names
tableName : 'usuarios_roles',
}
);

export default usuario_rol;