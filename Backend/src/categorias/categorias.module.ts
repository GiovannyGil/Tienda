import { Module } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'SECRET-KEY',
      signOptions: { expiresIn: '60s' },
    }),
    AuthModule,
    TypeOrmModule.forFeature([Categoria])],
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
