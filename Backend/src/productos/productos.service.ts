import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from 'src/categorias/entities/categoria.entity';

@Injectable()
export class ProductosService {

  constructor(
    @InjectRepository(Producto) private productoRepository: Repository<Producto>,
    @InjectRepository(Categoria) private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async create(createProductoDto: CreateProductoDto): Promise<Producto> {
    try {
      // recibir los datos para crear el Producto
      const { categoriaId, ...productoData } = createProductoDto;
  
      // buscar la categoria y verificar si existe
      const categoria = await this.categoriaRepository.findOne({
        where: { id: categoriaId },
      });
  
      // si no existe la categoria, lanzar un error
      if (!categoria) {
        throw new BadRequestException(`La categoría con ID ${categoriaId} no existe.`);
      }
  
      // Crear el producto y asignarle la categoría
      const nuevoProducto = this.productoRepository.create({
        ...productoData,
        categoria,
      });
  
      // Guardar el producto en la base de datos
      return await this.productoRepository.save(nuevoProducto);
    } catch (error) {
      throw new BadRequestException('Error al crear el producto');
    }
  }

  async findAll():Promise<Producto[]> {
    try {
      // buscar todos los productos
      const productos = await this.productoRepository.find()
      // si no encuentra nada, devolver un array vacio
      if (!productos) { throw new NotFoundException('No hay productos') }
      // devolver los productos
      return productos
    } catch (error) {
      throw new BadRequestException('Error al buscar los productos')
    }
  }

  async findOneByID(id: number): Promise<Producto> {
    try {
      // buscar el producto por id
      const producto = await this.productoRepository.findOne({
          where: { id, deletedAt: null },
      });
      // si no encuentra nada, devolver un mensaje de que no existe
      if (!producto) {
        throw new NotFoundException(`El producto con ID ${id} no existe.`);
      }
      // devolver los productos
      return producto
    } catch (error) {
      throw new BadRequestException('Error al buscar el producto por ID')
    }
  }

  async update(id: number, updateProductoDto: UpdateProductoDto): Promise<Producto> {
    try {
      // recibir los datos para actualizar el Producto
      const { categoriaId, ...productoData } = updateProductoDto;
    
      // buscar el producto y verificar si existe
      const producto = await this.productoRepository.findOneBy({ id });
      if (!producto) {
        throw new NotFoundException(`El producto con ID ${id} no existe.`);
      }
    
      // buscar la categoria y verificar si existe
      let categoria = producto.categoria;
      if (categoriaId) {
          categoria = await this.categoriaRepository.findOne({ where: { id: categoriaId } });
          if (!categoria) {
              throw new BadRequestException(`La categoría con ID ${categoriaId} no existe.`);
          }
      }
    
      // actualizar los datos del producto y asignarle la nueva categoría
      Object.assign(producto, productoData);
      producto.categoria = categoria;
    
      // Guardar el producto actualizado en la base de datos
      return this.productoRepository.save(producto);
    } catch (error) {
      throw new BadRequestException('Error al actualizar el producto')
    }
  }

  async softDelete(id: number) {
    try {
      const producto = await this.findOneByID(id);
  
      // verificar si la producto existe
      if (!producto) {
        throw new NotFoundException(`El producto con ID ${id} no existe.`);
      }
  
      // marcar la producto como eliminada
      producto.deletedAt = new Date()
  
      // guardar los cambios
      await this.productoRepository.save(producto)
  
      // devolver un mensaje
      return `El producto con ID ${id} fue eliminado correctamente.`;
    } catch (error) {
      throw new BadRequestException('Error al eliminar el producto')
    }
  }
}
