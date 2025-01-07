import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GeneralStatisticsDto } from './interfaces/dashboard.interface';

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
  obtenerEstadisticasProductos(): Observable<any> {
    return this.http.get(`${this.URL}/estadisticasProductos`);
  }

  //* obtener productos mas vendidos
  obtenerProductosMasVendidos(): Observable<any> {
    return this.http.get(`${this.URL}/productosMasVendidos`);
  }

  //* obtener estadisticas usuarios
  obtenerEstadisticasUsuarios(): Observable<any> {
    return this.http.get(`${this.URL}/estadisticasUsuarios`);
  }

  //* obtener estadisticas roles
  obtenerEstadisticasRoles(): Observable<any> {
    return this.http.get(`${this.URL}/estadisticasRoles`);
  }

  //* obtener estadisticas categorias
  obtenerEstadisticasCategorias(): Observable<any> {
    return this.http.get(`${this.URL}/estadisticasCategorias`);
  }

  //* obtener estadisticas proveedores
  obtenerEstadisticasProveedores(): Observable<any> {
    return this.http.get(`${this.URL}/estadisticasProveedores`);
  }

  //* obtener estadisticas ventas
  obtenerEstadisticasVentas(): Observable<any> {
    return this.http.get(`${this.URL}/estadisticasVentas`);
  }

  //* obtener estadisticas compras
  obtenerEstadisticasCompras(): Observable<any> {
    return this.http.get(`${this.URL}/estadisticasCompras`);
  }
}
