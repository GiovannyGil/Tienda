import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriasService {

  constructor(
    @InjectRepository(Categoria) private categoriaRepository: Repository<Categoria>
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    try {
      // recibir los datos para crear la categoria
      const categoria = this.categoriaRepository.create(createCategoriaDto)
      // si no hay nada o los datos sin incorrectos, o fallo
      if (!categoria) {
        throw new Error('No se pudo crear la categoria')
      }
      // guardar la categoria
      return await this.categoriaRepository.save(categoria)
    } catch (error) {
      throw new Error('Error Algo Salió Mal')
    }
  }

  async findAll():Promise<Categoria[]> {
    try {
      // buscar todas las categorias
      const categorias = await this.categoriaRepository.find({ where: { deletedAt: null } })
      // si no encuentra nada, devolver un array vacio
      if (!categorias) return []
      // devolver las categorias
      return categorias
    } catch (error) {
      throw new Error('Error Algo Salió Mal')
    }
  }

  async findOneByID(id: number): Promise<Categoria> {
    try {
      // buscar la categoria por id
      const categoria = await this.categoriaRepository.findOneBy({id, deletedAt: null})
      // si no encuentra nada, devolver un array vacio
      if (!categoria) return null
      // devolver la categoria
      return categoria
    } catch (error) {
      throw new Error('Error Algo Salió Mal')
    }
  }

  async findOneByName(nombre: string): Promise<Categoria>{
    try {
      // buscar la categoria
      const categoria = await this.categoriaRepository.findOneBy({nombre, deletedAt: null})
      // si no encuentra nada
      if (!categoria) { throw new NotFoundException('La categoria no existe') }
      // devolver la categoria
      return categoria
    } catch (error) {
      throw new BadRequestException('Error Algo Salió Mal')
    }
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    try {
      // buscar la categoria por id
      const categoriaUpdate = await this.categoriaRepository.update(id, updateCategoriaDto)

      // si no encuentra nada, devolver un array vacio
      if (!categoriaUpdate) return null
      // devolver la categoria
      return categoriaUpdate
    } catch (error) {
      throw new Error('Error Algo Salió Mal')
    }
  }

  async softDelete(id: number) {
    try {
      // buscar la categoria por id
      const categoria = await this.findOneByID(id)
      // verificar si la categoria existe
      if (!categoria) {
        throw new Error('La categoria no existe o ya fue eliminada')
      }

      // marcar la categoria como eliminada
      categoria.deletedAt = new Date()
      // guardar los cambios
      await this.categoriaRepository.save(categoria)
      // devolver un mensaje
      return 'La categoria fue eliminada'
    } catch (error) {
      throw new Error('Error Algo Salió Mal')
    }
  }
}
