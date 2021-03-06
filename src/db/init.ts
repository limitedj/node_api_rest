import Usuario from './models/usuario';
import UsuarioRol from "./models/usuario_rol";
import Rol from "./models/rol"
import MenuRol from "./models/menu_rol";
import Menu from "./models/menu";


require('dotenv').config()


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