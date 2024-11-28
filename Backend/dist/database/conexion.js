"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConnexionDDBB = {
    type: "sqlite",
    database: "tienda.sqlite",
    entities: [__dirname + './../**/*.entity{.ts,.js}'],
    synchronize: true,
    logging: true,
};
exports.default = ConnexionDDBB;
//# sourceMappingURL=conexion.js.map