"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// import diff from 'microdiff'
const sequelize_1 = require("sequelize");
// import { SequelizeHooks } from 'sequelize/types/lib/hooks'
// import localCache from '../lib/local-cache'
const isTest = process.env.NODE_ENV === 'test';
const dbName = isTest ? process.env.TEST_DB_NAME : process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbHost = process.env.DB_HOST;
const dbDriver = process.env.DB_DIALECT;
const dbPassword = process.env.DB_PASSWORD;
const dbPort = Number(process.env.DB_PORT);
// const hooks: Partial<SequelizeHooks<Model<any, any>, any, any>> = {
//     afterUpdate: (instance: Model<any, any>) => {
//       const cacheKey = `${instance.constructor.name.toLowerCase()}s`
//       const currentData = instance.get({ plain: true })
//       if (!localCache.hasKey(cacheKey)) {
//         return
//       }
const db = new sequelize_1.Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDriver,
    port: dbPort
});
console.log(dbName, dbUser, dbPassword, dbHost, dbDriver, dbPort);
exports.default = db;
//# sourceMappingURL=config.js.map