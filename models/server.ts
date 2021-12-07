import express from 'express';
import userRouters from '../routes/usuarios';
import authRouters from '../routes/auth';
import cors from 'cors';
import db from '../db/connection';
import sequelize from 'sequelize';

class Server {

    public app: express.Application ;
    private port: string;
    private apiPaths = {
        auth: "/api/auth",
        usuarios: '/api/usuarios'
   

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
        this.app.use(express.urlencoded({ extended: false }));
        
        //CARPETA PUBLICA
        this.app.use( express.static('public'));

    }

    
    routes() {
        this.app.use( this.apiPaths.auth, authRouters),
        this.app.use( this.apiPaths.usuarios, userRouters)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto' + ' ' + this.port);
        })
    }
}

export default Server;