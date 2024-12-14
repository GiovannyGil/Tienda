import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import { Proveedore } from 'src/proveedores/entities/proveedore.entity';
import { Producto } from 'src/productos/entities/producto.entity';
import { Venta } from 'src/ventas/entities/venta.entity';
import { Compra } from 'src/compras/entities/compra.entity';
import { GeneralStatisticsDto } from './dto/estadisticas.dto';
import { startOfMonth, endOfMonth } from 'date-fns';

@Injectable()
export class DashboardService {
  constructor(
    // Usuario, Role, Categoria, Proveedore, Producto, ventas, compras
    @InjectRepository(Usuario) private usuarioRepo: Repository<Usuario>,
    @InjectRepository(Role) private RoleRepo: Repository<Role>,
    @InjectRepository(Categoria) private CategoriaRepo: Repository<Categoria>,
    @InjectRepository(Proveedore) private ProveedoreRepo: Repository<Proveedore>,
    @InjectRepository(Producto) private ProductoRepo: Repository<Producto>,
    @InjectRepository(Venta) private VentaRepo: Repository<Venta>,
    @InjectRepository(Compra) private CompraRepo: Repository<Compra>,
  ) {}


  // metodos de consulta -> DASHBOARD
  async obtenerEstadisticasGenerales(): Promise<GeneralStatisticsDto> {
    try {
      return {
        userCount: await this.usuarioRepo.count(),
        roleCount: await this.RoleRepo.count(),
        categoryCount: await this.CategoriaRepo.count(),
        providerCount: await this.ProveedoreRepo.count(),
        productCount: await this.ProductoRepo.count(),
        saleCount: await this.VentaRepo.count(),
        purchaseCount: await this.CompraRepo.count(),
      };
    } catch (error) {
      throw new BadRequestException(`Error al obtener las estadisticas generales: ${error.message}`);
    }
  }

  async obtenerEstadisticasProductos() {
    try {
      // cantidades
      const CantidadProductos = await this.ProductoRepo.count();
      // cantidad de productos por categoria
      const CantidadProductosPorCategoria = await this.ProductoRepo.createQueryBuilder('producto')
        .select('COUNT(producto.id)', 'cantidad')
        .addSelect('categoria.nombre', 'categoria')
        .innerJoin('producto.categoria', 'categoria')
        .groupBy('categoria.nombre')
        .getRawMany();


      // cantidad vendida por producto (5 mas vendidos)
      const CantidadVendidaPorProducto = await this.VentaRepo.createQueryBuilder('venta')
        .select('SUM(producto.stock)', 'cantidad') // Asegúrate de tener un campo relacionado
        .addSelect('producto.nombre', 'producto')
        .innerJoin('venta.productos', 'producto')
        .groupBy('producto.nombre')
        .orderBy('cantidad', 'DESC')
        .limit(5)
        .getRawMany();


      // total por cada producto
      const TotalPorProducto = await this.VentaRepo.createQueryBuilder('venta').select('SUM(detalle.cantidad * detalle.precio)', 'total').addSelect('producto.nombre', 'producto').innerJoin('venta.detalles', 'detalle').innerJoin('detalle.producto', 'producto').groupBy('producto.nombre').getRawMany();

      return { CantidadProductos, CantidadProductosPorCategoria, CantidadVendidaPorProducto, TotalPorProducto }
    } catch (error) {
      throw new BadRequestException(`Error al obtener las estadisticas de productos: ${error.message}`);      
    }
  }

  async obtenerProductosMasVendidos() {
    try {
      // cantidad de productos vendidos
      const ProductosMasVendidos = await this.VentaRepo.createQueryBuilder('venta').select('SUM(detalle.cantidad)', 'cantidad').addSelect('producto.nombre', 'producto').innerJoin('venta.detalles', 'detalle').innerJoin('detalle.producto', 'producto').groupBy('producto.nombre').orderBy('cantidad', 'DESC').getRawMany();

      return { ProductosMasVendidos }
    } catch (error) {
      throw new BadRequestException(`Error al obtener los productos mas vendidos: ${error.message}`);      
    }
  }

  async obtenerEstadisticasUsuarios() {
    try {
      // cantidades
      const CantidadUsuarios = await this.usuarioRepo.count();
      // cantidad de usuarios por rol
      const UsuariosPorRol = await this.usuarioRepo.createQueryBuilder('usuario').select('COUNT(usuario.id)', 'cantidad').addSelect('role.nombre', 'rol').innerJoin('usuario.role', 'role').groupBy('role.nombre').getRawMany();

      return { CantidadUsuarios, UsuariosPorRol }
    } catch (error) {
      throw new BadRequestException(`Error al obtener las estadisticas de usuarios: ${error.message}`);
    }
  }

  async obtenerEstadisticasRoles() {
    try {
      // cantidad de roles
      const CantidadRoles = await this.RoleRepo.count();

      return { CantidadRoles }
    } catch (error) {
      throw new BadRequestException(`Error al obtener las estadisticas de roles: ${error.message}`);
    }
  }

  async obtenerEstadisticasCategorias() {
    try {
      // cantidad de categorias
      const CantidadCategorias = await this.CategoriaRepo.count();
      return { CantidadCategorias }
    } catch (error) {
      throw new BadRequestException(`Error al obtener las estadisticas de categorias: ${error.message}`);
    }
  }

  async obtenerEstadisticasProveedores() {
    try {
      // cantidad de proveedores
      const CantidadProveedores = await this.ProveedoreRepo.count();
      return { CantidadProveedores }
    } catch (error) {
      throw new BadRequestException(`Error al obtener las estadisticas de proveedores: ${error.message}`);      
    }
  }

  async obtenerEstadisticasVentas() {
    try {
      const totalVentas = await this.VentaRepo.count()

      // Calcula rangos antes del query
      const inicioMes = startOfMonth(new Date());
      const finMes = endOfMonth(new Date());
  
      const totalVentasMES = await this.VentaRepo.count({})
      const totalVentasAÑO = await this.VentaRepo.count({})
  
      const ingresos = await this.VentaRepo.createQueryBuilder('venta').select('SUM(venta.montoTotal)', 'ingresos').getRawOne()
      const ingresosMES = await this.VentaRepo.createQueryBuilder('venta').select('SUM(venta.montoTotal)', 'ingresos').where('venta.createdAt BETWEEN :inicio AND :fin', { inicio: inicioMes, fin: finMes }).getRawOne()
      const ingresosAÑO = await this.VentaRepo.createQueryBuilder('venta').select('SUM(venta.montoTotal)', 'ingresos').where('venta.createdAt BETWEEN :inicio AND :fin', { inicio: inicioMes, fin: finMes }).getRawOne()
  
      return {
        totalVentas, 
        totalVentasMES, 
        totalVentasAÑO, 
        ingresos, 
        ingresosMES, 
        ingresosAÑO
      }
    } catch (error) {
      throw new BadRequestException(`Error al obtener las estadisticas de ventas: ${error.message}`);
    }
  }

  async obtenerEstadisticasCompras() {
    try {
      const totalCompras = await this.CompraRepo.count();
  
      const totalComprasMES = await this.CompraRepo.createQueryBuilder('compra').where('MONTH(compra.createdAt) = MONTH(CURDATE())').getCount();
      const totalComprasAÑO = await this.CompraRepo.createQueryBuilder('compra').where('YEAR(compra.createdAt) = YEAR(CURDATE())').getCount();
  
      const gastos = await this.CompraRepo.createQueryBuilder('compra').select('SUM(compra.montoTotal)', 'gastos').getRawOne();
      const gastosMES = await this.CompraRepo.createQueryBuilder('compra').select('SUM(compra.montoTotal)', 'gastos').where('MONTH(compra.createdAt) = MONTH(CURDATE())').getRawOne();
      const gastosAÑO = await this.CompraRepo.createQueryBuilder('compra').select('SUM(compra.montoTotal)', 'gastos').where('YEAR(compra.createdAt) = YEAR(CURDATE())').getRawOne();
  
      return { totalCompras, totalComprasMES, totalComprasAÑO, gastos, gastosMES, gastosAÑO }
    } catch (error) {
      throw new BadRequestException(`Error al obtener las estadisticas de compras: ${error.message}`);
    }
  }
}
