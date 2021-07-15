import { DataTypes } from 'sequelize';
import db from '../db/connection';

//Modelo de Roles

const Role = db.define( 'role' , {
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