import { DataType } from 'sequelize-typescript';
import db from '../db/connection';

//Modelo de Usuarios

const Usuario = db.define( 'usuario' , {
    nombre: {
        type: DataType.STRING,
        allowNull: false
    },
    email: {
        type: DataType.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataType.STRING,
        allowNull: false
    },
    imagen: {
        type: DataType.STRING,
    },
    rol: {
        type: DataType.STRING,
        allowNull: false
    },
    estado: {
        type: DataType.BOOLEAN,
        defaultValue: true
    },
    google: {
        type: DataType.STRING,
        allowNull: true
    }
});

export default Usuario;