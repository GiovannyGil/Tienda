import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, LessThan, Repository } from 'typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class UsuariosService {

  constructor(
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Role) private roleRepository: Repository<Role>
  ) {}

  // metodo para crear un usuario
  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    try {
      const { rolId, ...usuarioData } = createUsuarioDto;
  
      // Buscar el rol y verificar si existe
      const rol = await this.roleRepository.findOne({
        where: { id: rolId, deletedAt: null },
      });
  
      // Si no existe el rol, lanzar una excepción de tipo BadRequestException
      if (!rol) {
        throw new NotFoundException(`El rol con ID ${rolId} no existe`);
      }
  
      // Crear el usuario y asignarle el rol
      const nuevoUsuario = this.usuarioRepository.create({
        ...usuarioData,
        rol,
      });
  
      // Guardar el usuario en la base de datos
      return await this.usuarioRepository.save(nuevoUsuario);
    } catch (error) {
      // Mejor manejo de errores
      throw new BadRequestException(
        `Error al crear el usuario: ${error.message}`,
      );
    }
  }
  

  // metodo para buscar todos los usuarios
  async findAll(): Promise<Usuario[]> {
    try {
      // buscar todos los usuarios
      const usuarios = await this.usuarioRepository.find({ where: { deletedAt: null }, relations: ['rol'] })
      // si no encuentra nada, devolver un array vacio
      if (!usuarios) { throw new NotFoundException('No hay usuarios registrados.') }
      return usuarios
    } catch (error) {
      throw new BadRequestException(`Error al encontrar los usuarios ${error.message}`)
    }
  }

  // metodo para buscar un usuario por id
  async findOneByID(id: number) {
    try {
      // buscar el usuario por id
      const usuario = await this.usuarioRepository.findOne({ where: { id , deletedAt: null} })
      // si no encuentra nada, devolver un array vacio
      if (!usuario) { throw new NotFoundException(`El usuario con ID ${id} no existe o ya fue eliminado.`) }
      // devolver el usuario
      return usuario
    } catch (error) {
      throw new BadRequestException(`Error al encontrar el usuario ${error.message}`)
    }
  }

  // meotodo para buscar un usuario por NombreUsuario
  async findOneByNombreUsuario(nombreUsuario: string): Promise<Usuario> {
    try {
      // buscr el usuario por nombreUsuario
      const usuario = await this.usuarioRepository.findOne({ where: { NombreUsuario: nombreUsuario, deletedAt: null } })

      // si no encuentra nada, devolver un array vacio
      if (!usuario) { throw new NotFoundException(`El usuario con NombreUsuario ${nombreUsuario} no existe o ya fue eliminado.`) }
      // devolver el usuario
      return usuario
    } catch (error) {
      throw new BadRequestException(`Error al encontrar el usuario ${error.message}`)
    }
  }

  // metodo para buscar un usuario por email
  async findOneByCorreo(correo: string): Promise<Usuario> {
    try {
      // buscr el usuario por correo
      const usuario = await this.usuarioRepository.findOne({ where: { correo: correo, deletedAt: null } })

      // si no encuentra nada, devolver un array vacio
      if (!usuario) { throw new NotFoundException(`El usuario con correo ${correo} no existe o ya fue eliminado.`) }
      // devolver el usuario
      return usuario
    } catch (error) {
      throw new BadRequestException(`Error al encontrar el usuario ${error.message}`)
    }
  }


  // metodo para actualizar un usuario
  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    try {
      const { rolId, ...usuarioData } = updateUsuarioDto;
  
      // Buscar al usuario existente
      const usuario = await this.usuarioRepository.findOne({
        where: { id, deletedAt: null },
        relations: ['rol'], // Cargar el rol actual para la comparación
      });
  
      if (!usuario) {
        throw new NotFoundException(`El usuario con ID ${id} no existe o ya fue eliminado.`);
      }
  
      // Manejar el cambio de rol, si es necesario
      if (rolId && usuario.rol?.id !== rolId) {
        // Buscar el nuevo rol
        const nuevoRol = await this.roleRepository.findOne({ where: { id: rolId } });
  
        if (!nuevoRol) {
          throw new NotFoundException(`El rol con ID ${rolId} no existe.`);
        }
  
        // Asignar el nuevo rol al usuario
        usuario.rol = nuevoRol;
      }
  
      // Actualizar los datos del usuario
      Object.assign(usuario, usuarioData);
  
      // Guardar los cambios en la base de datos
      return await this.usuarioRepository.save(usuario);
    } catch (error) {
      throw new BadRequestException(`Error al actualizar el usuario: ${error.message}`);
    }
  }
  

  // metodo para eliminar un usuario
  async softDelete(id: number) {
    try {
      // buscar el usuario por id
      const usuario = await this.usuarioRepository.findOne({
        where: { id, deletedAt: null },
      });

      // verificar si el usuario existe
      if (!usuario) {
        throw new NotFoundException('El usuario no existe o ya fue eliminado');
      }

      // marcar el usuario como eliminado
      usuario.deletedAt = new Date();

      // guardar los cambios
      await this.usuarioRepository.save(usuario);

      return "Usuario eliminado Correctamente";
    } catch (error) {
      throw new BadRequestException(`Error al eliminar el usuario ${error.message}`);
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT) // Tarea programada diariamente a la medianoche
  async cleanDeletedRecords() {
    try {
      const thresholdDate = new Date();
      thresholdDate.setDate(thresholdDate.getDate() - 30); // Fecha límite (30 días atrás)

      const usuariosParaEliminar = await this.usuarioRepository.find({
        where: {
          deletedAt: In([LessThan(thresholdDate)]), // usuarios con deletedAt anterior al límite
        },
      });

      if (usuariosParaEliminar.length > 0) {
        await this.usuarioRepository.remove(usuariosParaEliminar); // Eliminación definitiva
        console.log(`Eliminadas ${usuariosParaEliminar.length} usuarios obsoletas.`);
      }
    } catch (error) {
      console.error('Error al limpiar registros eliminados:', error);
      throw new InternalServerErrorException(
        'Ocurrió un error al eliminar usuarios obsoletas.',
      );
    }
  }
}
