import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { In, LessThan, Repository } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class RolesService {


  constructor(@InjectRepository(Role) private roleRepository: Repository<Role>) {}

  // metodo para verificar si ya exitse le rol a crear
  async verifyExistROL(nombreRol: string): Promise<Boolean> {
    try {
      // buscar el rol
      const RolExiste = await this.roleRepository.findOne({ where : { nombreRol, deletedAt: null }})
  
      // devuleve true si existe o false si no existe
      return !!RolExiste
    } catch (error) {
      throw new Error('Error al verificar la existencia del ROL')
    }
  }

  // metodo para crear un rol
  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    try {

      // verificar si el rol ya existe
      const RolExiste = await this.verifyExistROL(createRoleDto.nombreRol)
      if(RolExiste) throw new BadRequestException('El rol ya existe')

      // crear el rol
      const NuevoRol = this.roleRepository.create(createRoleDto)

      // si no hay nada o los datos sin incorrectos, o fallo
      if(!NuevoRol) return null

      // si es correcto guardar el nuevo rol
      return await this.roleRepository.save(NuevoRol)

    } catch (error) {
      throw new Error('Error al crear el ROL')
    }
  }

  // metodo para buscar todos los roles
  async findAll(): Promise<Role[]> {
    try {
      // buscar los roles
      const roles = await this.roleRepository.find({ where: { deletedAt: null } })

      // si no encuentra nada, devolver un array vacio
      if(!roles || roles.length === 0) return []

      return roles
    } catch (error) {
      throw new Error('Error al buscar los roles')
    }
  }

  // metodo para buscr un rol por id
  async findOneByID(id: number): Promise<Role> {
    try {
      // buscar el rol
      const rol = await this.roleRepository.findOneBy({id, deletedAt: null})
      // si no encuentra el rol devolver un null
      if(!rol) return null
      // retornar el rol
      return rol
    } catch (error) {
      throw new Error('Error al buscar el rol')
    }
  }

  // metodo para buscar un rol por nombre
  async findOneByNombre(nombreRol: string): Promise<Role> {
    try {
      // buscar el rol
      const rol = await this.roleRepository.findOneBy({ nombreRol, deletedAt: null })
      // si no encuentra el rol devolver un null
      if (!rol) return null
      // retornar el rol
      return rol
    } catch (error) {
      throw new Error('Error al buscar el rol')
    }
  }

  // metodo para actualizar
  async update(id: number, updateRoleDto: UpdateRoleDto) {
    try {
      // actualizar el rol
      const rol = await this.roleRepository.update(id, updateRoleDto)
      // si no hay rol devolver un null
      if(!rol) return null
      // devolver el rol actualizado
      return rol
    } catch (error) {
      throw new Error('Error al actualizar el rol')
    }
  }

  // mepara marcar un rol como eliminado -> deletedAt -> Tiempo/Fecha
  async softDelete(id: number): Promise<string> {
    try {
      // buscar el rol por id
      const rol = await this.findOneByID(id)

      // verificar si encontro el rol
      if(!rol) {
        throw new BadRequestException('El rol no existe o ya está eliminado')
      }

      // marcar el rol como eliminado estableciendo la fecha en deletedAt
      rol.deletedAt = new Date()

      // guardar los cambios
      await this.roleRepository.save(rol)

      return "ROL eliminado Correctamente"
    } catch (error) {
      throw new Error('Error al eliminar el ROL')
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT) // Tarea programada diariamente a la medianoche
  async cleanDeletedRecords() {
    try {
      const thresholdDate = new Date();
      thresholdDate.setDate(thresholdDate.getDate() - 30); // Fecha límite (30 días atrás)

      const roleParaEliminar = await this.roleRepository.find({
        where: {
          deletedAt: In([LessThan(thresholdDate)]), // role con deletedAt anterior al límite
        },
      });

      if (roleParaEliminar.length > 0) {
        await this.roleRepository.remove(roleParaEliminar); // Eliminación definitiva
        console.log(`Eliminadas ${roleParaEliminar.length} role obsoletas.`);
      }
    } catch (error) {
      console.error('Error al limpiar registros eliminados:', error);
      throw new InternalServerErrorException(
        'Ocurrió un error al eliminar role obsoletas.',
      );
    }
  }
}
