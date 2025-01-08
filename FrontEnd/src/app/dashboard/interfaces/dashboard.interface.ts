export interface GeneralStatisticsDto {
  userCount: number;
  roleCount: number;
  categoryCount: number;
  providerCount: number;
  productCount: number;
  saleCount: number;
  purchaseCount: number;
}


export interface EstadisticasProductos {
  CantidadProductos: number;
  CantidadProductosPorCategoria: any[];
  CantidadVendidaPorProducto: any[];
  TotalPorProducto: any[];
}

export interface ProductosMasVendidos {
  ProductosMasVendidos: any[];
}

export interface EstadisticasUsuarios {
  CantidadUsuarios: number;
    UsuariosPorRol: any[];
}

export interface EstadisticasRoles {
  CantidadRoles: number;
}

export interface EstadisticasCategorias {
  CantidadCategorias: number;
}

export interface EstadisticasProveedores {
  CantidadProveedores: number;
}

export interface EstadisticasVentas {
  totalVentas: number;
  totalVentasMES: number;
  totalVentasAÑO: number;
  ingresos: number;
  ingresosMES: number;
  ingresosAÑO: number;
}

export interface EstadisticasCompras {
  totalCompras: number;
  totalComprasMES: number;
  totalComprasAÑO: number;
  gastos: number;
  gastosMES: number;
  gastosAÑO: number;
}