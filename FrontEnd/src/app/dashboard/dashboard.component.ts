import { Component } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  estadisticasGenerales: any;
  estadisticasProductos: any;

  productosMasVendidosChart: any;
  ventasChart: any;

  constructor(private dashService: DashboardService, private router: Router) { }

  //todo: inicializar los metodos automaticamente
  ngOnInit(): void {
    this.getEstadisticasGenerales();
    this.getEstadisticasProductos();
  }

  ///* Obtener estadísticas generales
  private getEstadisticasGenerales(): void {
    this.dashService.obtenerEstadisticasGenerales().subscribe(
      (data) => {
        this.estadisticasGenerales = data;
      },
      (error) => {
        console.error(`Error al obtener estadísticas generales: ${error}`);
      }
    );
  }

  //* Obtener estadísticas productos
  private getEstadisticasProductos(): void {
    this.dashService.obtenerEstadisticasProductos().subscribe(
      (data) => {
        this.estadisticasProductos = data;
        this.updateProductosMasVendidosChart(data);
      },
      (error) => {
        console.error(`Error al obtener estadísticas de productos: ${error}`);
      }
    );
  }


  //* Actualizar gráfico de productos más vendidos
  private updateProductosMasVendidosChart(data: any): void {
    const labels = data.map((item: any) => item.nombre);
    const values = data.map((item: any) => item.cantidadVendida);

    this.productosMasVendidosChart.data.labels = labels;
    this.productosMasVendidosChart.data.datasets[0].data = values;
    this.productosMasVendidosChart.update();
  }

}
