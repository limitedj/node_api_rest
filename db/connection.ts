import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

const db = new Sequelize(
    process.env.DB_NOMBRE , 
    process.env.DB_USER , 
    process.env.DB_PASSWORD ,
    {host: process.env.DB_SERVER,
    dialect: process.env.DB_DIALECT ,
    port: process.env.DB_PORT,
    //logging: false
    }
)

export default db;