"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConnexionDDBB = {
    type: "sqlite",
    database: "tienda",
    entities: [__dirname + "/../models/*.ts"],
    synchronize: true,
};
exports.default = ConnexionDDBB;
//# sourceMappingURL=conexion.js.map