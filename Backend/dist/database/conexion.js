"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConnexionDDBB = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'tienda',
    entities: [__dirname + './../**/*.entity{.ts,.js}'],
    synchronize: false,
    logging: true,
};
exports.default = ConnexionDDBB;
//# sourceMappingURL=conexion.js.map