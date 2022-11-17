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
exports.start = exports.get = void 0;
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./api/routes"));
// dbInit()
const port = 3000;
const get = () => {
    const app = express_1.default();
    // Body parsing Middleware
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        return res.status(200).send({ message: `Welcome to the cookbook API! \n Endpoints available at http://localhost:${port}/api/v1` });
    }));
    app.use('/api', routes_1.default);
    return app;
};
exports.get = get;
const start = () => {
    const app = exports.get();
    try {
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    }
    catch (error) {
        console.log(`Error occurred: ${error.message}`);
    }
};
exports.start = start;
exports.start();
//# sourceMappingURL=___ejemplo____index.js.map