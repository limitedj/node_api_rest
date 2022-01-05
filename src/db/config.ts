import { Dialect, Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();


const dbName = process.env.DB_NAME as string; 
const dbUser = process.env.DB_USER as string; 
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_SERVER;
const dbDriver = process.env.DB_DIALECT as Dialect;
const dbPort = Number(process.env.DB_PORT);

const db = new Sequelize(dbName, dbUser, dbPassword,{
    host:dbHost,
    dialect: dbDriver,
    port: dbPort
});

console.log(dbName,dbUser,dbPassword,dbHost,dbDriver,dbPort);
export default db;
