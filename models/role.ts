import { DataType } from 'sequelize-typescript'
';
import db from '../db/connection';

//Modelo de Roles

const Role = db.addModels( 'role' , {
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
    }
});

export default Role;