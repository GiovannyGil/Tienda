import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ComprasService } from './compras.service';
import { CreateCompraDto } from './dto/create-compra.dto';
import { UpdateCompraDto } from './dto/update-compra.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from '../roles/decorators/roles.decorator';

@Controller('compras')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ComprasController {
  constructor(private readonly comprasService: ComprasService) {}

  @Post()
  @Roles('Administrador')
  create(@Body() createCompraDto: CreateCompraDto) {
    return this.comprasService.create(createCompraDto);
  }

  @Get()
  @Roles('Administrador', 'Empleado', 'Contador', 'Analista') 
  findAll() {
    return this.comprasService.findAll();
  }

  @Get(':id')
  @Roles('Administrador', 'Empleado', 'Contador', 'Analista') 
  findOne(@Param('id') id: string) {
    return this.comprasService.findOne(+id);
  }

  @Patch(':id')
  @Roles('Administrador')
  update(@Param('id') id: string, @Body() updateCompraDto: UpdateCompraDto) {
    return this.comprasService.update(+id, updateCompraDto);
  }

  @Delete(':id')
  @Roles('Administrador')
  remove(@Param('id') id: string) {
    return this.comprasService.softDelete(+id);
  }

  // ejecución manual de eliminaciones permanentes
  @Delete('cleanup')
  @Roles('Administrador')
  cleanDeletedRecords() {
    return this.comprasService.cleanDeletedRecords();
  }
}
