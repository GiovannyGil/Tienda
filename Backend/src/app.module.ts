import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// importar modulos
import ConexionDDBB from './database/conexion'
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { Role } from './roles/entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(ConexionDDBB),
    TypeOrmModule.forFeature([Role]), 
    AuthModule, RolesModule, UsuariosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
