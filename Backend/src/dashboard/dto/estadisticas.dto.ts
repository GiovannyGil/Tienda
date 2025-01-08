export class GeneralStatisticsDto {
    userCount: number;
    roleCount: number;
    categoryCount: number;
    providerCount: number;
    productCount: number;
    saleCount: number;
    purchaseCount: number;
}


export class EstadisticasProductos {
    CantidadProductos: number;
    CantidadProductosPorCategoria: any[];
    CantidadVendidaPorProducto: any[];
    TotalPorProducto: any[];
}

export class ProductosMasVendidos {
    ProductosMasVendidos: any[];
}

export class EstadisticasUsuarios {
    CantidadUsuarios: number;
    UsuariosPorRol: any[];
}

export class EstadisticasRoles {
    CantidadRoles: number;
}

export class EstadisticasCategorias {
    CantidadCategorias: number;
}

export class EstadisticasProveedores {
    CantidadProveedores: number;
}

export class EstadisticasVentas {
    totalVentas: number;
    totalVentasMES: number;
    totalVentasAÑO: number;
    ingresos: number;
    ingresosMES: number;
    ingresosAÑO: number;
}

export class EstadisticasCompras {
    totalCompras: number;
    totalComprasMES: number;
    totalComprasAÑO: number;
    gastos: number;
    gastosMES: number;
    gastosAÑO: number;
}