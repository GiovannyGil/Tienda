import { Module } from '@nestjs/common';
import { ProveedoresService } from './proveedores.service';
import { ProveedoresController } from './proveedores.controller';
import { Proveedore } from './entities/proveedore.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Proveedore])],
  controllers: [ProveedoresController],
  providers: [ProveedoresService],
  exports: [ProveedoresService, TypeOrmModule]
})
export class ProveedoresModule { }
