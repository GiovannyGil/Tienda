import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from '../roles/decorators/roles.decorator';
@Controller('dashboard')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('estadisticasGenerales')
  @Roles('Administrador', 'Empleado', 'Contador', 'Analista')
  obtenerEstadisticasGenerales() {
    return this.dashboardService.obtenerEstadisticasGenerales();
  }
  
  @Get('estadisticasProductos')
  @Roles('Administrador', 'Empleado', 'Contador', 'Analista')
  obtenerEstadisticasProductos(){
    return this.dashboardService.obtenerEstadisticasProductos();
  }
  
  @Get('productosMasVendidos')
  @Roles('Administrador', 'Empleado', 'Contador', 'Analista')
  obtenerProductosMasVendidos(){
    return this.dashboardService.obtenerProductosMasVendidos();
  }

  @Get('estadisticasUsuarios')
  @Roles('Administrador', 'Empleado', 'Contador', 'Analista')
  obtenerEstadisticasUsuarios(){
    return this.dashboardService.obtenerEstadisticasUsuarios();
  }

  @Get('estadisticasRoles')
  @Roles('Administrador', 'Empleado', 'Contador', 'Analista')
  obtenerEstadisticasRoles(){
    return this.dashboardService.obtenerEstadisticasRoles();
  }

  @Get('estadisticasCategorias')
  @Roles('Administrador', 'Empleado', 'Contador', 'Analista')
  obtenerEstadisticasCategorias(){
    return this.dashboardService.obtenerEstadisticasCategorias();
  }

  @Get('estadisticasProveedores')
  @Roles('Administrador', 'Empleado', 'Contador', 'Analista')
  obtenerEstadisticasProveedores(){
    return this.dashboardService.obtenerEstadisticasProveedores();
  }

  @Get('estadisticasVentas')
  @Roles('Administrador', 'Empleado', 'Contador', 'Analista')
  obtenerEstadisticasVentas(){
    return this.dashboardService.obtenerEstadisticasVentas();
  }

  @Get('estadisticasCompras')
  @Roles('Administrador', 'Empleado', 'Contador', 'Analista')
  obtenerEstadisticasCompras(){
    return this.dashboardService.obtenerEstadisticasCompras();
  }
}
