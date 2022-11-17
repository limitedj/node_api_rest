"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./api/routes"));
// import db from "./db/config";
class Server {
    constructor() {
        this.app = express_1.default();
        this.port = process.env.PORT;
        //Metodos Iniciales
        // this.dbConnection();
        this.db();
        this.middlewares();
        this.routes();
        this.msn();
    }
    db() { }
    ;
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
        this.app.use(cors_1.default());
        //LECTURA DEL BODY
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        //CARPETA PUBLICA
        this.app.use(express_1.default.static('public'));
    }
    routes() { this.app.use('/api', routes_1.default); }
    ;
    msn() {
        this.app.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            return res.status(200).send({ message: `Welcome to the cookbook API! \n Endpoints available at http://localhost:${this.port}/api/v1` });
        }));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto' + ' ' + this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=index.js.map