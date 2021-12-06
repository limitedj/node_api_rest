import { Dialect, Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

const db = new Sequelize(
    process.env.DB_NOMBRE as string , 
    process.env.DB_USER as string , 
    process.env.DB_PASSWORD ,
    {host: process.env.DB_SERVER,
    dialect: process.env.DB_DIALECT as Dialect,
    port: 5434 ,
    //logging: false
    }
)

export default db;
