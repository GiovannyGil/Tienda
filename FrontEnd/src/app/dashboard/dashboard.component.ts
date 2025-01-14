import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  estadisticasGenerales: any;
  estadisticasProductos: any;

  productosMasVendidos: any;
  ventasChart: any;

  constructor(private dashService: DashboardService, private router: Router) { }

  //todo: inicializar los metodos automaticamente
  ngOnInit(): void {
    // this.obtenerEstadisticasGenerales();
    // this.obtenerEstadisticasProductos();
    // this.obtenerProductosMasVendidos();
    // this.obtenerEstadisticasUsuarios();
    // this.obtenerEstadisticasRoles();
    // this.obtenerEstadisticasCategorias();
    // this.obtenerEstadisticasProveedores();
    // this.obtenerEstadisticasVentas();
    // this.obtenerEstadisticasCompras();
    // console.log(this.obtenerEstadisticasGenerales());
  }

  ///* Obtener estadísticas generales
  private obtenerEstadisticasGenerales(): void {
    this.dashService.obtenerEstadisticasGenerales().subscribe({
      next: (data) => (this.estadisticasGenerales = data.userCount),
      error: (err) => console.error('Error al cargar estadísticas generales:', err),
    });
  }

  //* Obtener estadísticas productos
  private obtenerEstadisticasProductos(): void {
    this.dashService.obtenerEstadisticasProductos().subscribe(
      (data) => { this.estadisticasProductos = data.CantidadProductos },
      (error) => { console.error(`Error al obtener estadísticas de productos: ${error}`) }
    )
  }

  //* Obtener productos más vendidos
  private obtenerProductosMasVendidos(): void {
    this.dashService.obtenerProductosMasVendidos().subscribe(
      (data) => { this.productosMasVendidos },
      (error) => { console.error(`Error al obtener los productos más vendidos: ${error}`) }
    )
  }

  //* Obtener estadísticas usuarios
  private obtenerEstadisticasUsuarios(): void {
    this.dashService.obtenerEstadisticasUsuarios().subscribe(
      (data) => { },
      (error) => { console.error(`Error al obtener las estadísticas de usuarios: ${error}`) }
    )
  }

  //* Obtener estadísticas roles
  private obtenerEstadisticasRoles(): void {
    this.dashService.obtenerEstadisticasRoles().subscribe(
      (data) => { },
      (error) => { console.error(`Error al obtener las estadísticas de roles: ${error}`) }
    )
  }

  //* Obtener estadísticas categorías
  private obtenerEstadisticasCategorias(): void {
    this.dashService.obtenerEstadisticasCategorias().subscribe(
      (data) => { },
      (error) => { console.error(`Error al obtener las estadísticas de categorías: ${error}`) }
    )
  }

  //* Obtener estadísticas proveedores
  private obtenerEstadisticasProveedores(): void {
    this.dashService.obtenerEstadisticasProveedores().subscribe(
      (data) => { },
      (error) => { console.error(`Error al obtener las estadísticas de proveedores: ${error}`) }
    )
  }

  //* Obtener estadísticas ventas
  private obtenerEstadisticasVentas(): void {
    this.dashService.obtenerEstadisticasVentas().subscribe(
      (data) => { },
      (error) => { console.error(`Error al obtener las estadísticas de ventas: ${error}`) }
    )
  }

  //* Obtener estadísticas compras
  private obtenerEstadisticasCompras(): void {
    this.dashService.obtenerEstadisticasCompras().subscribe(
      (data) => { },
      (error) => { console.error(`Error al obtener las estadísticas de compras: ${error}`) }
    )
  }
}
