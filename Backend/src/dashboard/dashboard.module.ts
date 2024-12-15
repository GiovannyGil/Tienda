import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { RolesModule } from 'src/roles/roles.module';
import { CategoriasModule } from 'src/categorias/categorias.module';
import { ProveedoresModule } from 'src/proveedores/proveedores.module';
import { ProductosModule } from 'src/productos/productos.module';
import { VentasModule } from 'src/ventas/ventas.module';
import { ComprasModule } from 'src/compras/compras.module';

@Module({
  imports: [UsuariosModule, RolesModule, CategoriasModule, ProveedoresModule, ProductosModule, VentasModule, ComprasModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
