"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const role_entity_1 = require("../roles/entities/role.entity");
const ConnexionDDBB = {
    type: "sqlite",
    database: "tienda.sqlite",
    entities: [role_entity_1.Role],
    synchronize: true,
    logging: true,
};
exports.default = ConnexionDDBB;
//# sourceMappingURL=conexion.js.map