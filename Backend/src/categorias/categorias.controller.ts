import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@Controller('categorias')
@UseGuards(JwtAuthGuard)
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriasService.create(createCategoriaDto);
  }

  @Get()
  findAll() {
    return this.categoriasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriasService.findOneByID(+id);
  }

  @Get('nombre/:nombre')
  findOneByName(@Param('nombre') nombre: string) {
    return this.categoriasService.findOneByName(nombre);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoriaDto: UpdateCategoriaDto) {
    return this.categoriasService.update(+id, updateCategoriaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriasService.softDelete(+id);
  }

  // ejecución manual de eliminaciones permanentes
  @Delete('cleanup')
  cleanDeletedRecords() {
    return this.categoriasService.cleanDeletedRecords();
  }
}
