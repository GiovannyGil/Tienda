import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  obtenerEstadisticasGenerales() {
    return this.dashboardService.obtenerEstadisticasGenerales();
  }
  
  @Get()
  obtenerEstadisticasProductos(){
    return this.dashboardService.obtenerEstadisticasProductos();
  }
  
  @Get()
  obtenerProductosMasVendidos(){
    return this.dashboardService.obtenerProductosMasVendidos();
  }

  @Get()
  obtenerEstadisticasUsuarios(){
    return this.dashboardService.obtenerEstadisticasUsuarios();
  }

  @Get()
  obtenerEstadisticasRoles(){
    return this.dashboardService.obtenerEstadisticasRoles();
  }

  @Get()
  obtenerEstadisticasCategorias(){
    return this.dashboardService.obtenerEstadisticasCategorias();
  }

  @Get()
  obtenerEstadisticasProveedores(){
    return this.dashboardService.obtenerEstadisticasProveedores();
  }

  @Get()
  obtenerEstadisticasVentas(){
    return this.dashboardService.obtenerEstadisticasVentas();
  }

  @Get()
  obtenerEstadisticasCompras(){
    return this.dashboardService.obtenerEstadisticasCompras();
  }
}
