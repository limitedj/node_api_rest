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
const usuarios_1 = __importDefault(require("../routes/usuarios"));
const auth_1 = __importDefault(require("../routes/auth"));
const menus_1 = __importDefault(require("../routes/menus"));
const roles_menus_1 = __importDefault(require("../routes/roles_menus"));
const roles_1 = __importDefault(require("../routes/roles"));
const usuarios_roles_1 = __importDefault(require("../routes/usuarios_roles"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("../db/connection"));
require('./asociaciones');
class Server {
    constructor() {
        this.apiPaths = {
            login: '/api/auth',
            usuarios: '/api/usuarios',
            roles: '/api/roles',
            usuarios_roles: '/api/usuarios_roles',
            menus: '/api/menus',
            roles_menus: '/api/roles_menus'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT;
        //Metodos Iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('Database online');
            }
            catch (error) {
                console.log(error);
                // throw new Error(error);
            }
        });
    }
    middlewares() {
        //CORS
        this.app.use((0, cors_1.default)());
        //LECTURA DEL BODY
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        //CARPETA PUBLICA
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.apiPaths.login, auth_1.default),
            this.app.use(this.apiPaths.usuarios, usuarios_1.default),
            this.app.use(this.apiPaths.roles, roles_1.default),
            this.app.use(this.apiPaths.usuarios_roles, usuarios_roles_1.default),
            this.app.use(this.apiPaths.menus, menus_1.default),
            this.app.use(this.apiPaths.roles_menus, roles_menus_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto' + ' ' + this.port);
        });
        // db.sync({alter: true}).then(()=> {
        //     console.log('los modelos se sincronizaron con la tablas');
        // }).catch(error => {
        //     console.log('Se ha producido un error',error);
        // })
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map