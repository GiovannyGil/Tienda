import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// importar modulos
import ConexionDDBB from './database/conexion'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(ConexionDDBB)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
