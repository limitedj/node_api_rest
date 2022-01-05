import express from 'express';
import cors from 'cors';
import authRouters from '../../api/routes/auth';
import userRouters from '../../api/routes/usuarios';
import rolRouters from '../../api/routes/roles';
import menuRouters from '../../api/routes/menus';
import db from "../config";
require('./usuario');
require('./rol');
require('./menu');
require('./usuario_rol');
require('./menu_rol');


// import usuarioRolRouters from '../../api/routes/usuarios_roles';
// import menuRolRouters from '../../api/routes/menus_roles';
// import sequelize from 'sequelize';
import Menu from '../../api/interfaces/menu.interfaces';

class Server {

    public app: express.Application ;
    private port: string;
    private apiPaths = {
        auth: "/api/auth",
        usuarios: '/api/usuario',
        roles: '/api/rol',
        menus: '/api/menu',
        // usuarios_roles: 'api/usuario_rol',
        // menus_roles: 'api/menu_rol',
   }
    constructor() {
        this.app = express();
        this.port = process.env.PORT as string;
        //Metodos Iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection(){

        try {
            await db.authenticate();
            // await db.sync({ force: true });
            console.log('Database online');
        } catch (error) {
            throw new Error( error as string );

            // erros as string fue modificado por ronald, verificar si funciona
        }

    
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        //LECTURA DEL BODY
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        
        //CARPETA PUBLICA
        this.app.use( express.static('public'));

    }
    
    routes() {
        this.app.use( this.apiPaths.auth, authRouters),
        this.app.use( this.apiPaths.usuarios, userRouters),
        this.app.use( this.apiPaths.roles, rolRouters),
        this.app.use( this.apiPaths.menus, menuRouters)
        // this.app.use( this.apiPaths.menus_roles, menuRolRouters),
        // this.app.use( this.apiPaths.usuarios_roles, usuarioRolRouters),
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto' + ' ' + this.port);
        })
    }
}

export default Server;