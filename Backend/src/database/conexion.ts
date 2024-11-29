import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Role } from "src/roles/entities/role.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";


const ConnexionDDBB: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'tienda',
    entities: [__dirname + './../**/*.entity{.ts,.js}'],
    synchronize: true,
    logging: true,
}

export default ConnexionDDBB