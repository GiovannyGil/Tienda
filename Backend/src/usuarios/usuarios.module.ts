import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { RolesModule } from 'src/roles/roles.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario]), RolesModule],
  controllers: [UsuariosController],
  providers: [UsuariosService, JwtService, TypeOrmModule],
  exports: [UsuariosService, TypeOrmModule]
})
export class UsuariosModule { }
