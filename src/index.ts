import express, { Application, Request, Response } from 'express';

import cors from 'cors';
import routes from './api/routes'
import db from './db/init';
// import db from "./db/config";



class Server {

    public app: express.Application ;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT as string;
  
        //Metodos Iniciales
        // this.dbConnection();
        this.db();
        this.middlewares();
        this.routes();
        this.msn();
        
    }

    db(){}; 
    // async dbConnection(){

    //     try {
    //         await db.authenticate();
    //         // await db.sync({ force: true });
    //         console.log('Database online');
    //     } catch (error) {
    //         throw new Error( error as string );

    //         // erros as string fue modificado por ronald, verificar si funciona
    //     }

    
    // }

    middlewares() {
        //CORS
        this.app.use(cors());

        //LECTURA DEL BODY
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        
        //CARPETA PUBLICA
        this.app.use( express.static('public'));

    }
    
    routes(){this.app.use('/api', routes)};

    msn(){this.app.get('/', async(req: Request, res: Response): Promise<Response> => {
        return res.status(200).send({ message: `Welcome to the cookbook API! \n Endpoints available at http://localhost:${this.port}/api/v1` })
    })}

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto' + ' ' + this.port);
        })
    }
}

export default Server;