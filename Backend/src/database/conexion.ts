import { TypeOrmModuleOptions  } from "@nestjs/typeorm";


const ConnexionDDBB: TypeOrmModuleOptions = {
    type: "sqlite",
    database: "tienda",
    entities: [__dirname + "/../models/*.ts"],
    synchronize: true,
}

export default ConnexionDDBB