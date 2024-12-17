import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { Venta } from './entities/venta.entity';
import { In, LessThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from 'src/productos/entities/producto.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class VentasService {

  constructor(
    @InjectRepository(Venta) private ventasRepository: Repository<Venta>,
    @InjectRepository(Producto) private productosRepository: Repository<Producto>,
    @InjectRepository(Usuario) private usuariosRepository: Repository<Usuario>
  ) {}

  async create(createVentaDto: CreateVentaDto) {
    const { descripcion, productosIds, usuariosId, montoTotal, metodoPago } = createVentaDto

    try {
      // verificar que el usuario existe

      const usuario = await this.usuariosRepository.findOne({ where: {id: usuariosId, deletedAt: null} })
      if(!usuario) { throw new NotFoundException('Usuario no encontrado') }

      // verificar que los productos existen
      const productos = await this.productosRepository.find({ where: { id: In(productosIds), deletedAt: null }, select: ['id', 'nombre', 'precio', 'marca', 'estado'] });
      if (productos.length !== productosIds.length) { throw new NotFoundException('Uno o más productos no existen o han sido eliminados') }

      if(!productosIds || productosIds.length === 0) { throw new BadRequestException('Debe proporcionar al menos un producto') }

      // crear la venta
      const nuevaVenta = this.ventasRepository.create({
        descripcion, productos, usuario, montoTotal, metodoPago
      })

      // guardar la venta
      const ventaCreada = await this.ventasRepository.save(nuevaVenta)

      // devolver la venta creada
      return {
        message: 'Venta creada correctamente',
        venta: ventaCreada
      }

    } catch (error) {
      // Lanza la excepción adecuada según el tipo de error
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Error al crear la venta', error.message);
    }
  }

  async findAll() {
    try {
      // buscar las ventas
      const ventas = await this.ventasRepository.find({ where: {deletedAt: null}, relations: ['productos', 'usuario'] });
      // si no encuentra nada
      if(!ventas) { throw new NotFoundException('No se encontraron ventas') }
      // devolver las ventas
      return ventas;
    } catch (error) {
      throw new BadRequestException('Error al buscar las ventas', error.message);
    }
  }

  async findOneByID(id: number) {
    try {
      // buscar la venta por id
      const venta = await this.ventasRepository.findOne({ where: {id, deletedAt: null}, relations: ['productos', 'usuario'] })
      // si no encuentra nada
      if(!venta) { throw new NotFoundException('No se encontro la venta') }
      // devolver la venta
      return venta
    } catch (error) {
      throw new BadRequestException('Error al buscar la venta')
    }
  }

  async update(id: number, updateVentaDto: UpdateVentaDto) {
    try {
      const { descripcion, productosIds, montoTotal, metodoPago } = updateVentaDto;

      // Verificar que la venta existe
      const venta = await this.ventasRepository.findOne({
        where: { id, deletedAt: null },
        relations: ['productos', 'usuario'],
      });

      if (!venta) {
        throw new NotFoundException(`No se encontró la venta con ID ${id}`);
      }

      // Validar que hay algo que actualizar
      const hasChanges =
        updateVentaDto.descripcion != null ||
        updateVentaDto.montoTotal != null ||
        updateVentaDto.metodoPago != null ||
        (updateVentaDto.productosIds && updateVentaDto.productosIds.length > 0);

      if (!hasChanges) {
        throw new BadRequestException('No se proporcionaron datos para actualizar');
      }

      // Validar productos asociados si se proporcionan
      if (productosIds && updateVentaDto.productosIds.length > 0) {
        const productos = await this.productosRepository.find({
          where: { id: In(updateVentaDto.productosIds), deletedAt: null }, select: ['id', 'nombre', 'precio', 'marca', 'estado']
        });

        if (productos.length !== updateVentaDto.productosIds.length) {
          throw new NotFoundException(
            'Uno o más productos no existen o han sido eliminados',
          );
        }

        // Asignar productos actualizados a la venta
        venta.productos = productos;
      }

      // Actualizar campos opcionales
      if (updateVentaDto.descripcion != null) {
        venta.descripcion = descripcion;
      }
      if (updateVentaDto.montoTotal != null) {
        venta.montoTotal = montoTotal;
      }
      if (updateVentaDto.metodoPago != null) {
        venta.metodoPago = metodoPago;
      }

      // Guardar cambios
      const ventaActualizada = await this.ventasRepository.save(venta);

      // Devolver respuesta de éxito
      return {
        message: 'Venta actualizada correctamente',
        venta: ventaActualizada,
      };
    } catch (error) {
      // Lanza la excepción adecuada según el tipo de error
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Error inesperado al actualizar la venta');
    }
  }


  async softDelete(id: number) {
    try {
      // buscar la venta por id
      const venta = await this.ventasRepository.findOne({ where: {id, deletedAt: null} })

      // si no encuentra nada
      if(!venta) { throw new NotFoundException('No se encontro la venta') }

      // actualizar la venta
      venta.deletedAt = new Date()

      // guardar la venta
      await this.ventasRepository.save(venta)

      // devolver mensaje de exito
      return "Venta eliminada correctamente"
    } catch (error) {
      if(error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Ocurrió un error inesperado');
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT) // Tarea programada diariamente a la medianoche
  async cleanDeletedRecords() {
    try {
      const thresholdDate = new Date();
      thresholdDate.setDate(thresholdDate.getDate() - 30); // Fecha límite (30 días atrás)

      const ventasParaEliminar = await this.ventasRepository.find({
        where: {
          deletedAt: In([LessThan(thresholdDate)]), // Ventas con deletedAt anterior al límite
        },
      });

      if (ventasParaEliminar.length > 0) {
        await this.ventasRepository.remove(ventasParaEliminar); // Eliminación definitiva
        console.log(`Eliminadas ${ventasParaEliminar.length} ventas obsoletas.`);
      }
    } catch (error) {
      console.error('Error al limpiar registros eliminados:', error);
      throw new InternalServerErrorException(
        'Ocurrió un error al eliminar ventas obsoletas.',
      );
    }
  }
}
