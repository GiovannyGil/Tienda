import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EstadisticasCategorias, EstadisticasCompras, EstadisticasProductos, EstadisticasProveedores, EstadisticasRoles, EstadisticasUsuarios, EstadisticasVentas, GeneralStatisticsDto, ProductosMasVendidos } from './interfaces/dashboard.interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  // url del backend
  private URL = 'http://localhost:3000/dashboard'; // /login, /logout
  // palabra secreta
  private tokenKey = 'SECRET_KEY';
  constructor(private http: HttpClient, private router: Router) { }


  //! metodos dashboard
  //* obtener estadisticas generales
  obtenerEstadisticasGenerales(): Observable<GeneralStatisticsDto> {
    return this.http.get<GeneralStatisticsDto>(`${this.URL}/estadisticasGenerales`);
  }

  //* obtener estadisticas productos
  obtenerEstadisticasProductos(): Observable<EstadisticasProductos> {
    return this.http.get<EstadisticasProductos>(`${this.URL}/estadisticasProductos`);
  }

  //* obtener productos mas vendidos
  obtenerProductosMasVendidos(): Observable<ProductosMasVendidos> {
    return this.http.get<ProductosMasVendidos>(`${this.URL}/productosMasVendidos`);
  }

  //* obtener estadisticas usuarios
  obtenerEstadisticasUsuarios(): Observable<EstadisticasUsuarios> {
    return this.http.get<EstadisticasUsuarios>(`${this.URL}/estadisticasUsuarios`);
  }

  //* obtener estadisticas roles
  obtenerEstadisticasRoles(): Observable<EstadisticasRoles> {
    return this.http.get<EstadisticasRoles>(`${this.URL}/estadisticasRoles`);
  }

  //* obtener estadisticas categorias
  obtenerEstadisticasCategorias(): Observable<EstadisticasCategorias> {
    return this.http.get<EstadisticasCategorias>(`${this.URL}/estadisticasCategorias`);
  }

  //* obtener estadisticas proveedores
  obtenerEstadisticasProveedores(): Observable<EstadisticasProveedores> {
    return this.http.get<EstadisticasProveedores>(`${this.URL}/estadisticasProveedores`);
  }

  //* obtener estadisticas ventas
  obtenerEstadisticasVentas(): Observable<EstadisticasVentas> {
    return this.http.get<EstadisticasVentas>(`${this.URL}/estadisticasVentas`);
  }

  //* obtener estadisticas compras
  obtenerEstadisticasCompras(): Observable<EstadisticasCompras> {
    return this.http.get<EstadisticasCompras>(`${this.URL}/estadisticasCompras`);
  }
}
