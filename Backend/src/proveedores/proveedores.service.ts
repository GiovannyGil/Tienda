import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProveedoreDto } from './dto/create-proveedore.dto';
import { UpdateProveedoreDto } from './dto/update-proveedore.dto';
import { Proveedore } from './entities/proveedore.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, LessThan, Repository } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ProveedoresService {

  constructor(
    @InjectRepository(Proveedore) private proveedorRepository: Repository<Proveedore>
  ) { }

  async create(createProveedorDto: CreateProveedoreDto): Promise<Proveedore> {
    try {
      // recibir los datos para crear la Proveedor
      const proveedor = this.proveedorRepository.create(createProveedorDto)
      // si no hay nada o los datos sin incorrectos, o fallo
      if (!proveedor) {
        throw new Error('No se pudo crear la proveedor')
      }
      // guardar la proveedor
      return await this.proveedorRepository.save(proveedor)
    } catch (error) {
      throw new Error('Error Algo Salió Mal')
    }
  }

  async findAll(): Promise<Proveedore[]> {
    try {
      // buscar todas las proveedors
      const proveedores = await this.proveedorRepository.find()
      // si no encuentra nada, devolver un array vacio
      if (!proveedores) return []
      // devolver las proveedors
      return proveedores
    } catch (error) {
      throw new Error('Error Algo Salió Mal')
    }
  }

  async findOneByName(nombreEmpresa: string): Promise<Proveedore> {
    try {
      // buscar la proveedor por nombre
      const proveedor = await this.proveedorRepository.findOneBy({ nombreEmpresa, deletedAt: null })
      // si no encuentra nada, devolver un array vacio
      if (!proveedor) return null
      // devolver la proveedor
      return proveedor
    } catch (error) {
      throw new BadRequestException('Error Algo Salió Mal')
    }
  }

  async findOneByID(id: number): Promise<Proveedore> {
    try {
      // buscar la proveedor por id
      const proveedor = await this.proveedorRepository.findOneBy({ id, deletedAt: null })
      // si no encuentra nada, devolver un array vacio
      if (!proveedor) return null
      // devolver la proveedor
      return proveedor
    } catch (error) {
      throw new Error('Error Algo Salió Mal')
    }
  }

  async update(id: number, updateProveedoreDto: UpdateProveedoreDto) {
    try {
      // buscar la proveedor por id
      const proveedorUpdate = await this.proveedorRepository.update(id, updateProveedoreDto)

      // si no encuentra nada, devolver un array vacio
      if (!proveedorUpdate) return null
      // devolver la proveedor
      return proveedorUpdate
    } catch (error) {
      throw new Error('Error Algo Salió Mal')
    }
  }

  async softDelete(id: number) {
    try {
      // buscar la proveedor por id
      const proveedor = await this.findOneByID(id)
      // verificar si la proveedor existe
      if (!proveedor) {
        throw new Error('La proveedor no existe o ya fue eliminada')
      }

      // marcar la proveedor como eliminada
      proveedor.deletedAt = new Date()
      // guardar los cambios
      await this.proveedorRepository.save(proveedor)
      // devolver un mensaje
      return 'La proveedor fue eliminada'
    } catch (error) {
      throw new Error('Error Algo Salió Mal')
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT) // Tarea programada diariamente a la medianoche
  async cleanDeletedRecords() {
    try {
      const thresholdDate = new Date();
      thresholdDate.setDate(thresholdDate.getDate() - 30); // Fecha límite (30 días atrás)

      const proveedoreParaEliminar = await this.proveedorRepository.find({
        where: {
          deletedAt: In([LessThan(thresholdDate)]), // proveedore con deletedAt anterior al límite
        },
      });

      if (proveedoreParaEliminar.length > 0) {
        await this.proveedorRepository.remove(proveedoreParaEliminar); // Eliminación definitiva
        console.log(`Eliminadas ${proveedoreParaEliminar.length} proveedore obsoletas.`);
      }
    } catch (error) {
      console.error('Error al limpiar registros eliminados:', error);
      throw new InternalServerErrorException(
        'Ocurrió un error al eliminar proveedore obsoletas.',
      );
    }
  }
}
