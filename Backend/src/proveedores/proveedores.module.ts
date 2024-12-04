import { Module } from '@nestjs/common';
import { ProveedoresService } from './proveedores.service';
import { ProveedoresController } from './proveedores.controller';
import { Proveedore } from './entities/proveedore.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriasModule } from 'src/categorias/categorias.module';

@Module({
  imports: [TypeOrmModule.forFeature([Proveedore]), CategoriasModule],
  controllers: [ProveedoresController],
  providers: [ProveedoresService],
  exports: [ProveedoresService, TypeOrmModule]
})
export class ProveedoresModule { }
