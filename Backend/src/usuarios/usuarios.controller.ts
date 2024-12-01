import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  findOneByID(@Param('id') id: string) {
    return this.usuariosService.findOneByID(+id);
  }

  @Get(':id')
  findOneByNombreUsuario(@Param('NombreUsuario') NombreUsuario: string) {
    return this.usuariosService.findOneByNombreUsuario(NombreUsuario);
  }

  @Get(':correo')
  findOneByCorreo(@Param('correo') correo: string) {
    return this.usuariosService.findOneByCorreo(correo);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.softDelete(+id);
  }

  // ejecución manual de eliminaciones permanentes
  @Delete('cleanup')
  cleanDeletedRecords() {
    return this.usuariosService.cleanDeletedRecords();
  }
}
