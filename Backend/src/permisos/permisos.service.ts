import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { UpdatePermisoDto } from './dto/update-permiso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permiso } from './entities/permiso.entity';
import { In, LessThan, Repository } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class PermisosService {

  constructor(@InjectRepository(Permiso) private permisoRepository: Repository<Permiso>) {}

  // metodo para verificar si ya exitse el permiso a crear
  async verifyExistPermiso(nombrePermiso: string): Promise<Boolean> {
    try {
      const permisoExiste = await this.permisoRepository.findOne({ where : { nombrePermiso, deletedAt: null }})

      // devuleve true si existe o false si no existe
      return permisoExiste ? true : false
    } catch (error) {
      throw new InternalServerErrorException('Error al verificar la existencia del permiso', error.message)
    }
  }

  async create(createPermisoDto: CreatePermisoDto): Promise<Permiso> {
    try {
      // verificar si el permiso ya existe
      const permisoExiste = await this.verifyExistPermiso(createPermisoDto.nombrePermiso)
      if(permisoExiste) throw new BadRequestException('El permiso ya existe')

      // crear el permiso
      const permiso = this.permisoRepository.create(createPermisoDto)
      // si no hay nada o los datos sin incorrectos, o fallo
      if(!permiso) return null

      // si es correcto guardar el nuevo permiso
      return await this.permisoRepository.save(permiso)
    } catch (error) {
      throw new InternalServerErrorException('Error al crear el permiso', error.message)
    }
  }

  async findAll(): Promise<Permiso[]> {
    try {
      // optener los permisos
      const permisos = await this.permisoRepository.find({ where: { deletedAt: null } })

      // si no encuentra nada, devolver un array vacio
      if(!permisos) throw new BadRequestException('No hay permisos')

      // devolver los permisos
      return permisos
    } catch (error) {
      throw new InternalServerErrorException('Error al buscar los permisos', error.message)
    }
  }

  async findOneByID(id: number): Promise<Permiso> {
    try {
      // buscar el permiso por id
      const permiso = await this.permisoRepository.findOneBy({id, deletedAt: null})

      // si no encuentra nada, devolver un null
      if(!permiso) { throw new BadRequestException('El permiso no existe') }

      // devolver el permiso
      return permiso
    } catch (error) {
      throw new InternalServerErrorException('Error al buscar el permiso por id', error.message)
    }
  }

  async findOneByNombre(nombrePermiso: string): Promise<Permiso> {
    try {
      // buscar el permiso por el nombre
      const permiso = await this.permisoRepository.findOneBy({nombrePermiso, deletedAt: null})

      // si no encuentra nada, devolver un null
      if(!permiso) throw new BadRequestException('El permiso no existe')

      // devolver el permiso
      return permiso
    } catch (error) {
      throw new InternalServerErrorException('Error al buscar el permiso por el nombre', error.message)
    }
  }

  async update(id: number, updatePermisoDto: UpdatePermisoDto) {
    try {
      // actualizar el permiso
      const permisoUpdated = await this.permisoRepository.update(id, updatePermisoDto)

      // si no hay permiso devolver un null
      if(!permisoUpdated) return null

      // devolver el permiso actualizado
      return permisoUpdated
    } catch (error) {
      throw new InternalServerErrorException('Erro al actualziar el permiso', error.message)
    }
  }

  // mepara marcar un rol como eliminado -> deletedAt -> Tiempo/Fecha
  async softDelete(id: number): Promise<string> {
    try {
      // buscar el rol por id
      const permiso = await this.findOneByID(id)

      // verificar si encontro el rol
      if(!permiso) throw new BadRequestException('El rol no existe o ya está eliminado')

      // marcar el rol como eliminado estableciendo la fecha en deletedAt
      permiso.deletedAt = new Date()

      // guardar los cambios
      await this.permisoRepository.save(permiso)

      return "Permiso eliminado Correctamente"
    } catch (error) {
      throw new InternalServerErrorException('Error al eliminar el ROL', error.message)
    }
  }

  async remove(id: number) {
    try {
      const permiso = await this.findOneByID(id)

      // verficar si el permiso existe
      if(!permiso) throw new BadRequestException('El permiso no existe o ya fue eliminado')

      // marcar como eliminado
      permiso.deletedAt = new Date()

      // guardar los cambios
      await this.permisoRepository.save(permiso)

      // devolver un mensaje
      return 'Permiso eliminado Correctamente'
    } catch (error) {
      throw new InternalServerErrorException('Error al eliminar el permiso', error.message)
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT) // Tarea programada diariamente a la medianoche
  async cleanDeletedRecords() {
    try {
      const thresholdDate = new Date();
      thresholdDate.setDate(thresholdDate.getDate() - 30); // Fecha límite (30 días atrás)

      const permisoParaEliminar = await this.permisoRepository.find({
        where: {
          deletedAt: In([LessThan(thresholdDate)]), // permiso con deletedAt anterior al límite
        },
      });

      if (permisoParaEliminar.length > 0) {
        await this.permisoRepository.remove(permisoParaEliminar); // Eliminación definitiva
        console.log(`Eliminadas ${permisoParaEliminar.length} permiso obsoletas.`);
      }
    } catch (error) {
      console.error('Error al limpiar registros eliminados:', error);
      throw new InternalServerErrorException(
        'Ocurrió un error al eliminar permiso obsoletas.', error.message,
      );
    }
  }
}
