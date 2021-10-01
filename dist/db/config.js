"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('node', 'postgres', 'postgres', { host: '127.0.0.1',
    dialect: 'postgres',
    port: 5434
    //logging: false
});
exports.default = db;
//# sourceMappingURL=config.js.map