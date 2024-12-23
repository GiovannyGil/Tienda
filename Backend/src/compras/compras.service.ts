import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCompraDto } from './dto/create-compra.dto';
import { UpdateCompraDto } from './dto/update-compra.dto';
import { Compra } from './entities/compra.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, LessThan, Repository } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Proveedore } from 'src/proveedores/entities/proveedore.entity';
import { Producto } from 'src/productos/entities/producto.entity';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ComprasService {

  constructor(
    @InjectRepository(Compra) private comprasRepository: Repository<Compra>,
    @InjectRepository(Usuario) private usuariosRepository: Repository<Usuario>,
    @InjectRepository(Proveedore) private proveedoresRepository: Repository<Proveedore>,
    @InjectRepository(Producto) private productosRepository: Repository<Producto>,
  ) {}

  async create(createCompraDto: CreateCompraDto) {
    const { descripcion, proveedorIds, productosIds, usuariosId, montoTotal, metodoPago } = createCompraDto;
    try {
      // verificar que el usuario existe
      const usuario = await this.usuariosRepository.findOne({ where: {id: usuariosId, deletedAt: null} })
      if(!usuario) throw new NotFoundException('Usuario no encontrado')

      // verificar que los productos existen
      const productos = await this.productosRepository.find({ where: { id: In(productosIds), deletedAt: null }, select: ['id', 'nombre', 'precio', 'marca', 'estado'] });
      if (productos.length !== productosIds.length) {
        throw new NotFoundException('Uno o más productos no existen o han sido eliminados') 
      }

      // verificar que los proveedores existen
      const proveedores = await this.proveedoresRepository.find({
        where: { id: In(proveedorIds), deletedAt: null }, select: [
          'id', 'nombreAsesor', 'nombreEmpresa', 'email', 'celular', 'telefono', 'direccion'
        ] });
      if (proveedores.length !== proveedorIds.length) throw new NotFoundException('Uno o más proveedores no existen o han sido eliminados')

      // crear la compra
      const nuevaCompra = this.comprasRepository.create({
        descripcion, productos, usuario, montoTotal, metodoPago, proveedores
      })

      // guardar la compra
      const compraCreada = await this.comprasRepository.save(nuevaCompra)

      // devolver la compra creada
      return {
        message: 'Compra creada correctamente',
        compra: compraCreada
      }


      
    } catch (error) {
      // Lanza la excepción adecuada según el tipo de error
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Error al crear la compra: ${error.message}`);
    }
  }

  async findAll(): Promise<Compra[]> {
    try {
      // buscar las compras
      const compras = await this.comprasRepository.find({ where: {deletedAt: null}, relations: ['productos', 'usuario', 'proveedores'] });

      // si no encuentra nada
      if (!compras) throw new NotFoundException('No se encontraron compras')

      // devolver las compras
      return compras;
    } catch (error) {
      throw new BadRequestException(`Error al buscar los usuario ${error.message}`);
    }
  }

  async findOne(id: number): Promise<Compra> {
    try {
      // buscar la compra
      const compra = await this.comprasRepository.findOne({ where: {id, deletedAt: null}, relations: ['productos', 'usuario', 'proveedores'] });

      // si no encuentra nada
      if(!compra) throw new NotFoundException('No se encontro la compra')

      // devolver la compra
      return compra;
    } catch (error) {
      throw new BadRequestException(`Error al buscar el usuario ${error.message}`);
      
    }
  }

  async update(id: number, updateCompraDto: UpdateCompraDto) {
    try {
      const { descripcion, montoTotal, metodoPago, productosIds, proveedorIds } = updateCompraDto;

      // verificar que la compra existe
      const compra = await this.comprasRepository.findOne({
        where: { id, deletedAt: null },
        relations: ['productos', 'usuario', 'proveedores'],
      });

      if (!compra) throw new NotFoundException('Compra no encontrada')

      // validar que hay algo que actualizar
      const hasChanges =
        updateCompraDto.descripcion != null ||
        updateCompraDto.montoTotal != null ||
        updateCompraDto.metodoPago != null ||
        (updateCompraDto.productosIds && updateCompraDto.productosIds.length > 0) ||
        (updateCompraDto.proveedorIds && updateCompraDto.proveedorIds.length > 0);

      if (!hasChanges) throw new BadRequestException('No se encontraron datos para actualizar')

      // verificar que los productos existen
      if (productosIds) {
        const productos = await this.productosRepository.find({ where: { id: In(updateCompraDto.productosIds), deletedAt: null }, select: ['id', 'nombre', 'precio', 'marca', 'estado'] });
        if (productos.length !== updateCompraDto.productosIds.length) throw new NotFoundException('Uno o más productos no existen o han sido eliminados') 
        compra.productos = productos;
      }

      // verificar que los proveedores existen
      if (proveedorIds) {
        const proveedores = await this.proveedoresRepository.find({ where: { id: In(updateCompraDto.proveedorIds), deletedAt: null }, select: [
          'id', 'nombreAsesor', 'nombreEmpresa', 'email', 'celular', 'telefono', 'direccion'
        ] });
        if (proveedores.length !== updateCompraDto.proveedorIds.length) throw new NotFoundException('Uno o más proveedores no existen o han sido eliminados')
        compra.proveedores = proveedores;
      }

      // actualizar la compra -> campos opcionales
      if (updateCompraDto.descripcion != null) { compra.descripcion = descripcion; }
      if (updateCompraDto.montoTotal != null) { compra.montoTotal = montoTotal; }
      if (updateCompraDto.metodoPago != null) { compra.metodoPago = metodoPago; }

      // guardar la compra
      const compraActualizada = await this.comprasRepository.save(compra);

      // devolver la compra actualizada
      return {
        message: 'Compra actualizada correctamente',
        compra: compraActualizada
      }

    } catch (error) {
      // Lanza la excepción adecuada según el tipo de error
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Error al actualizar la compra: ${error.message}`);
    }
  }


  async softDelete(id: number) {
    try {
      // buscar la compra por id
      const compra = await this.comprasRepository.findOne({ where: { id, deletedAt: null } })

      // si no encuentra nada
      if (!compra) throw new NotFoundException('No se encontro la compra')

      // actualizar la compra
      compra.deletedAt = new Date()

      // guardar la compra
      await this.comprasRepository.save(compra)

      // devolver mensaje de exito
      return "compra eliminada correctamente"
    } catch (error) {
      throw new BadRequestException('Error al eliminar la compra', error.message)
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT) // Tarea programada diariamente a la medianoche
  async cleanDeletedRecords() {
    try {
      const thresholdDate = new Date();
      thresholdDate.setDate(thresholdDate.getDate() - 30); // Fecha límite (30 días atrás)

      const comprasParaEliminar = await this.comprasRepository.find({
        where: {
          deletedAt: In([LessThan(thresholdDate)]), // compras con deletedAt anterior al límite
        },
      });

      if (comprasParaEliminar.length > 0) {
        await this.comprasRepository.remove(comprasParaEliminar); // Eliminación definitiva
        console.log(`Eliminadas ${comprasParaEliminar.length} compras obsoletas.`);
      }
    } catch (error) {
      console.error('Error al limpiar registros eliminados:', error);
      throw new InternalServerErrorException(
        'Ocurrió un error al eliminar compras obsoletas.', error.message,
      );
    }
  }
}
