// import dotenv from 'dotenv';
import Server from './src/db/models/server';

// dotenv.config();

const server = new Server();

server.listen();

// console.log('VARIABLE GLOBAL DE app' + ' ' + process.env.DB_SERVER + ' ' + process.env.DB_DIALECT);


