require('dotenv').config();

import { Usuario, Menu, Rol, MenuRol, UsuarioRol } from './models';

const isDev = process.env.NODE_ENV === 'development'
const isTest = process.env.NODE_ENV !== 'test'

const dbInit = () => Promise.all([
    Rol.sync({ alter: isDev || isTest }),
    Usuario.sync({ alter: isDev || isTest }),
    Menu.sync({ alter: isDev || isTest }),
    UsuarioRol.sync({ alter: isDev || isTest }),
    MenuRol.sync({ alter: isDev || isTest }),
  ])

export default dbInit 