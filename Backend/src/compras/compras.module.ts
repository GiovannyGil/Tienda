import { Module } from '@nestjs/common';
import { ComprasService } from './compras.service';
import { ComprasController } from './compras.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Compra } from './entities/compra.entity';
import { ProductosModule } from 'src/productos/productos.module';
import { ProveedoresModule } from 'src/proveedores/proveedores.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  imports: [TypeOrmModule.forFeature([Compra]), ProductosModule, ProveedoresModule, UsuariosModule],
  controllers: [ComprasController],
  providers: [ComprasService],
  exports: [ComprasService, TypeOrmModule]
})
export class ComprasModule { }
