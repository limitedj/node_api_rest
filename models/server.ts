import express,  { Application } from 'express';
import userRouters from '../routes/usuarios';
import cors from 'cors';
import db from '../db/connection';

class Server {

    private app ;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios'
    }
    constructor() {
        this.app = express();
        this.port = process.env.PORT ||'8000';
        //Metodos Iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection(){

        try {
            await db.authenticate();
            console.log('Database online');
        } catch (error) {
            throw new Error( error);
        }
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        //LECTURA DEL BODY
        this.app.use(express.json());

        //CARPETA PUBLICA
        this.app.use( express.static('public'));

    }

    routes() {
        this.app.use( this.apiPaths.usuarios, userRouters)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto' + this.port);
        })
    }
}

export default Server;