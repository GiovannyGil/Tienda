import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UpdateClaveDto } from './dto/update-clave.dto';
import { Roles } from 'src/roles/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
// import { RolesGuard } from 'src/roles/guards/roles.guard';

import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('usuarios')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) { }

  @Post()
  @Roles('Administrador')
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get()
  @Roles('Administrador', 'Empleado', 'Contador', 'Analista') 
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  @Roles('Administrador', 'Empleado', 'Contador', 'Analista') 
  findOneByID(@Param('id') id: string) {
    return this.usuariosService.findOneByID(+id);
  }

  @Get(':id')
  @Roles('Administrador', 'Empleado', 'Contador', 'Analista') 
  findOneByNombreUsuario(@Param('NombreUsuario') NombreUsuario: string) {
    return this.usuariosService.findOneByNombreUsuario(NombreUsuario);
  }

  @Get(':correo')
  @Roles('Administrador', 'Empleado', 'Contador', 'Analista') 
  findOneByCorreo(@Param('correo') correo: string) {
    return this.usuariosService.findOneByCorreo(correo);
  }

  @Patch(':id')
  @Roles('Administrador')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(+id, updateUsuarioDto);
  }

  @Patch(':id/cambiar-clave')
  @Roles('Administrador', 'Empleado', 'Contador', 'Analista') 
  updatePassword(@Param('id', ParseIntPipe) id: string, @Body() updateClaveDto: UpdateClaveDto) {
    return this.usuariosService.updatePassword(+id, updateClaveDto);
  }

  @Delete(':id')
  @Roles('Administrador')
  remove(@Param('id') id: string) {
    return this.usuariosService.softDelete(+id);
  }

  // ejecución manual de eliminaciones permanentes
  @Delete('cleanup')
  cleanDeletedRecords() {
    return this.usuariosService.cleanDeletedRecords();
  }
}
