import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PermisosService } from './permisos.service';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { UpdatePermisoDto } from './dto/update-permiso.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { RolesGuard } from '../roles/guards/roles.guard';
import { Roles } from '../roles/decorators/roles.decorator';

@Controller('permisos')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PermisosController {
  constructor(private readonly permisosService: PermisosService) {}

  @Post()
  @Roles('Administrador')
  create(@Body() createPermisoDto: CreatePermisoDto) {
    return this.permisosService.create(createPermisoDto);
  }

  @Get()
  @Roles('Administrador', 'Empleado', 'Contador', 'Analista')
  findAll() {
    return this.permisosService.findAll();
  }

  @Get(':id')
  @Roles('Administrador', 'Empleado', 'Contador', 'Analista')
  findOneByID(@Param('id') id: string) {
    return this.permisosService.findOneByID(+id);
  }

  @Get(':nombrePermiso')
  @Roles('Administrador', 'Empleado', 'Contador', 'Analista')
  findOneByNombre(@Param('nombrePermiso') nombrePermiso: string) {
    return this.permisosService.findOneByNombre(nombrePermiso);
  }

  @Patch(':id')
  @Roles('administrador')
  update(@Param('id') id: string, @Body() updatePermisoDto: UpdatePermisoDto) {
    return this.permisosService.update(+id, updatePermisoDto);
  }

  @Delete(':id')
  @Roles('Administrador')
  remove(@Param('id') id: string) {
    return this.permisosService.remove();
  }

  // ejecución manual de eliminaciones permanentes
  @Delete('cleanup')
  @Roles('Administrador')
  cleanDeletedRecords() {
    return this.permisosService.cleanDeletedRecords();
  }
}
