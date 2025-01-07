import { Component } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  estadisticasGenerales: any;
  estadisticasProductos: any;

  constructor(private dashService: DashboardService, private router: Router) { }

  //todo: inicializar los metodos automaticamente
  ngOnInit(): void {
    this.getEstadisticasGenerales();
    this.getEstadisticasProductos();
  }

  //* obtener estadisticas generales
  private getEstadisticasGenerales(): void {
    this.dashService.obtenerEstadisticasGenerales().subscribe(data => {
      console.log(data);
      this.estadisticasGenerales = data;
    }, error => {
      console.log(`Error al obtener las estadisticas generales: ${error}`);
    })
  }

  //* obtener estadisticas productos
  private getEstadisticasProductos(): void {
    this.dashService.obtenerEstadisticasProductos().subscribe(data => {
      console.log(data);
      this.estadisticasProductos = data;
    }, error => {
      console.log(`Error al obtener las estadisticas de productos: ${error}`);
    })
  }

}
