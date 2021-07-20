import { DataTypes } from 'sequelize';
import db from '../db/connection';


//Modelo de Usuarios

const Usuario = db.define( 'usuario' , {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imagen: {
        type: DataTypes.STRING,
    },
    rol: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    google: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

export default Usuario;