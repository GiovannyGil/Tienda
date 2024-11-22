import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Role } from "src/roles/entities/role.entity";


const ConnexionDDBB: TypeOrmModuleOptions = {
    type: "sqlite",
    database: "tienda.sqlite",
    entities: [Role],
    synchronize: true,
    logging: true,
}

export default ConnexionDDBB