import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { Roles  } from '../roles/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('roles')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  // @Roles('Administrador')
  async create(@Body() createRoleDto: CreateRoleDto) {
    return await this.rolesService.create(createRoleDto);
  }

  @Get()
  @Roles('Administrador', 'Empleado', 'Contador', 'Analista')
  async findAll() {
    return await this.rolesService.findAll();
  }

  @Get(':id')
  @Roles('Administrador', 'Empleado', 'Contador', 'Analista')
  async findOneByID(@Param('id') id: string) {
    return await this.rolesService.findOneByID(+id);
  }

  @Get(':nombreRol')
  @Roles('Administrador', 'Empleado', 'Contador', 'Analista')
  async findOneByNombre(@Param('nombreRol') nombreRol: string) {
    return await this.rolesService.findOneByNombre(nombreRol);
  }

  @Patch(':id')
  @Roles('Administrador')
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return await this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  @Roles('Administrador')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.rolesService.softDelete(id);
  }

  // ejecución manual de eliminaciones permanentes
  @Delete('cleanup')
  @Roles('Administrador')
  cleanDeletedRecords() {
    return this.rolesService.cleanDeletedRecords();
  }
}
