import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { UpdatePermisoDto } from './dto/update-permiso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permiso } from './entities/permiso.entity';
import { LessThan, Repository } from 'typeorm';

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
      throw new Error('Error al verificar la existencia del permiso')
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
      throw new Error('Error al crear el permiso')
    }
  }

  async findAll(): Promise<Permiso[]> {
    try {
      // optener los permisos
      const permisos = await this.permisoRepository.find({ where: { deletedAt: null } })

      // si no encuentra nada, devolver un array vacio
      if(!permisos || permisos.length === 0) return []

      // devolver los permisos
      return permisos
    } catch (error) {
      throw new Error('Error al buscar los permisos')
    }
  }

  async findOneByID(id: number): Promise<Permiso> {
    try {
      // buscar el permiso por id
      const permiso = await this.permisoRepository.findOneBy({id, deletedAt: null})

      // si no encuentra nada, devolver un null
      if(!permiso) return null

      // devolver el permiso
      return permiso
    } catch (error) {
      throw new Error('Error al buscar el permiso por id')
    }
  }

  async findOneByNombre(nombrePermiso: string): Promise<Permiso> {
    try {
      // buscar el permiso por el nombre
      const permiso = await this.permisoRepository.findOneBy({nombrePermiso, deletedAt: null})

      // si no encuentra nada, devolver un null
      if(!permiso) return null

      // devolver el permiso
      return permiso
    } catch (error) {
      throw new Error('Error al buscar el permiso por el nombre')
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
      throw new Error('Erro al actualziar el permiso')
    }
  }

  // mepara marcar un rol como eliminado -> deletedAt -> Tiempo/Fecha
  async softDelete(id: number): Promise<string> {
    try {
      // buscar el rol por id
      const permiso = await this.findOneByID(id)

      // verificar si encontro el rol
      if(!permiso) {
        throw new BadRequestException('El rol no existe o ya está eliminado')
      }

      // marcar el rol como eliminado estableciendo la fecha en deletedAt
      permiso.deletedAt = new Date()

      // guardar los cambios
      await this.permisoRepository.save(permiso)

      return "Permiso eliminado Correctamente"
    } catch (error) {
      throw new Error('Error al eliminar el ROL')
    }
  }

  async remove(): Promise<void> {
    try {
      // establecer la fecha de eliminacion permanente
      const fechaLimite = new Date()
      fechaLimite.setDate(fechaLimite.getDate() - 30)

      // optener los permisos marcados para eliminar
      const permisos = await this.permisoRepository.find({ where: { deletedAt: LessThan(fechaLimite) } })

      // eliminar los permisos
      await this.permisoRepository.delete({ deletedAt: LessThan(fechaLimite) })
    } catch (error) {
      throw new Error('Error al eliminar el permiso')
    }
  }
}
