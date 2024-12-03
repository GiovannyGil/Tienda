import { TypeOrmModuleOptions } from "@nestjs/typeorm";


const ConnexionDDBB: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'tienda',
    entities: [__dirname + './../**/*.entity{.ts,.js}'],
    synchronize: false,
    logging: true,
}

export default ConnexionDDBB