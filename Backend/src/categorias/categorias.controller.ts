import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { RolesGuard } from '../roles/guards/roles.guard';
import { Roles } from '../roles/decorators/roles.decorator';

@Controller('categorias')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  @Roles('administrador')
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriasService.create(createCategoriaDto);
  }

  @Get()
  @Roles('Administrador', 'Empleado', 'Contador', 'Analista') 
  findAll() {
    return this.categoriasService.findAll();
  }

  @Get(':id')
  @Roles('Administrador', 'empleado', 'contador', 'analista') 
  findOne(@Param('id') id: string) {
    return this.categoriasService.findOneByID(+id);
  }

  @Get('nombre/:nombre')
  @Roles('administrador', 'empleado', 'contador', 'analista') // aplicar el guard a un método específico (permisos)
  findOneByName(@Param('nombre') nombre: string) {
    return this.categoriasService.findOneByName(nombre);
  }

  @Patch(':id')
  @Roles('Administrador')
  update(@Param('id') id: string, @Body() updateCategoriaDto: UpdateCategoriaDto) {
    return this.categoriasService.update(+id, updateCategoriaDto);
  }

  @Delete(':id')
  @Roles('Administrador')
  remove(@Param('id') id: string) {
    return this.categoriasService.softDelete(+id);
  }

  // ejecución manual de eliminaciones permanentes
  @Delete('cleanup')
  @Roles('Administrador')
  cleanDeletedRecords() {
    return this.categoriasService.cleanDeletedRecords();
  }
}
