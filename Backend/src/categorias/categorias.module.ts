import { Module } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { RolesGuard } from '../roles/guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria])],
  controllers: [CategoriasController],
  providers: [
    {
    provide: APP_GUARD,
    useClass: RolesGuard,
    },
    CategoriasService
  ],
  exports: [CategoriasService, TypeOrmModule]
})
export class CategoriasModule { }
