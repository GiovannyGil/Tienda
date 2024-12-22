import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { RolesGuard } from 'src/roles/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
@Controller('dashboard')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  @Roles('Administrador', 'Empleado', 'Contador', 'Analista')
  obtenerEstadisticasGenerales() {
    return this.dashboardService.obtenerEstadisticasGenerales();
  }
  
  @Get()
  @Roles('Administrador', 'Empleado', 'Contador', 'Analista')
  obtenerEstadisticasProductos(){
    return this.dashboardService.obtenerEstadisticasProductos();
  }
  
  @Get()
  @Roles('Administrador', 'Empleado', 'Contador', 'Analista')
  obtenerProductosMasVendidos(){
    return this.dashboardService.obtenerProductosMasVendidos();
  }

  @Get()
  @Roles('Administrador', 'Empleado', 'Contador', 'Analista')
  obtenerEstadisticasUsuarios(){
    return this.dashboardService.obtenerEstadisticasUsuarios();
  }

  @Get()
  @Roles('Administrador', 'Empleado', 'Contador', 'Analista')
  obtenerEstadisticasRoles(){
    return this.dashboardService.obtenerEstadisticasRoles();
  }

  @Get()
  @Roles('Administrador', 'Empleado', 'Contador', 'Analista')
  obtenerEstadisticasCategorias(){
    return this.dashboardService.obtenerEstadisticasCategorias();
  }

  @Get()
  @Roles('Administrador', 'Empleado', 'Contador', 'Analista')
  obtenerEstadisticasProveedores(){
    return this.dashboardService.obtenerEstadisticasProveedores();
  }

  @Get()
  @Roles('Administrador', 'Empleado', 'Contador', 'Analista')
  obtenerEstadisticasVentas(){
    return this.dashboardService.obtenerEstadisticasVentas();
  }

  @Get()
  @Roles('Administrador', 'Empleado', 'Contador', 'Analista')
  obtenerEstadisticasCompras(){
    return this.dashboardService.obtenerEstadisticasCompras();
  }
}
