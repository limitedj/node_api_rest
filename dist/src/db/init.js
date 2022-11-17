"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const models_1 = require("./models");
const isDev = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV !== 'test';
const db = () => Promise.all([
    models_1.Rol.sync({ alter: isDev || isTest }),
    models_1.Usuario.sync({ alter: isDev || isTest }),
    models_1.Menu.sync({ alter: isDev || isTest }),
    models_1.UsuarioRol.sync({ alter: isDev || isTest }),
    models_1.MenuRol.sync({ alter: isDev || isTest }),
]);
//   sequelize.sync({ alter: true }).then(()=> {
//     //trabajando con nuestra actualización de tabla.  
//     console.log('Tabla creada con exito');
// }).catch((err)=>{
//     console.log(err);
// });  
exports.default = db;
//# sourceMappingURL=init.js.map