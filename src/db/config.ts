import dotenv from 'dotenv';

dotenv.config();

// import diff from 'microdiff'
import { Dialect, Model, Sequelize } from 'sequelize'

import { Usuario, Menu, Rol, MenuRol, UsuarioRol } from './models';


 
// import { SequelizeHooks } from 'sequelize/types/lib/hooks'

// import localCache from '../lib/local-cache'

const isTest = process.env.NODE_ENV === 'test'

const dbName = isTest ? process.env.TEST_DB_NAME as string : process.env.DB_NAME as string; 
const dbUser = process.env.DB_USER as string; 
const dbHost = process.env.DB_HOST;
const dbDriver = process.env.DB_DIALECT as Dialect;
const dbPassword = process.env.DB_PASSWORD;
const dbPort = Number(process.env.DB_PORT);

// const hooks: Partial<SequelizeHooks<Model<any, any>, any, any>> = {
//     afterUpdate: (instance: Model<any, any>) => {
//       const cacheKey = `${instance.constructor.name.toLowerCase()}s`
  
//       const currentData = instance.get({ plain: true })
  
//       if (!localCache.hasKey(cacheKey)) {
//         return
//       }




const db = new Sequelize(dbName, dbUser, dbPassword,{
    host:dbHost,
    dialect: dbDriver,
    port: dbPort
});

console.log(dbName,dbUser,dbPassword,dbHost,dbDriver,dbPort);

export default db;
