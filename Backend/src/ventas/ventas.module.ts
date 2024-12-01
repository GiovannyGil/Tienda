import { Module } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { VentasController } from './ventas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venta } from './entities/venta.entity';
import { ProductosModule } from 'src/productos/productos.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  imports: [TypeOrmModule.forFeature([Venta]), ProductosModule, UsuariosModule],
  controllers: [VentasController],
  providers: [VentasService],
  exports: [VentasService]
})
export class VentasModule { }
