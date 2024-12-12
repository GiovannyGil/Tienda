import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// importar modulos
import ConexionDDBB from './database/conexion'
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { UsuariosModule } from './usuarios/usuarios.module';


// Importar el módulo de tareas
import { ScheduleModule } from '@nestjs/schedule';
import { PermisosModule } from './permisos/permisos.module';
import { ProductosModule } from './productos/productos.module';
import { VentasModule } from './ventas/ventas.module';
import { ComprasModule } from './compras/compras.module';
import { CategoriasModule } from './categorias/categorias.module';
import { ProveedoresModule } from './proveedores/proveedores.module';

import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards/roles.guard';


@Module({
  imports: [
    TypeOrmModule.forRoot(ConexionDDBB),
    ScheduleModule.forRoot(), // Habilita la programación de tareas
    AuthModule, RolesModule, UsuariosModule, PermisosModule, ProductosModule, VentasModule, ComprasModule, CategoriasModule, ProveedoresModule],
  controllers: [AppController],
  providers: [{
    provide: APP_GUARD,
    useClass: RolesGuard,
  },
  AppService],
})
export class AppModule { }
