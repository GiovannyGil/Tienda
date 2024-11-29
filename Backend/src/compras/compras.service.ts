import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompraDto } from './dto/create-compra.dto';
import { UpdateCompraDto } from './dto/update-compra.dto';
import { Compra } from './entities/compra.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ComprasService {

  constructor(
    @InjectRepository(Compra) private comprasRepository: Repository<Compra>
  ) {}

  create(createCompraDto: CreateCompraDto) {
    return 'This action adds a new compra';
  }

  async findAll(): Promise<Compra[]> {
    try {
      // buscar las compras
      const compras = await this.comprasRepository.find({ where: {deletedAt: null} });

      // si no encuentra nada
      if (!compras) { throw new NotFoundException('No se encontraron compras') }

      // devolver las compras
      return compras;
    } catch (error) {
      throw new BadRequestException(`Error al buscar los usuario ${error.message}`);
    }
  }

  async findOne(id: number): Promise<Compra> {
    try {
      // buscar la compra
      const compra = await this.comprasRepository.findOne({ where: {id, deletedAt: null} })

      // si no encuentra nada
      if(!compra) { throw new NotFoundException('No se encontro la compra') }

      // devolver la compra
      return compra;
    } catch (error) {
      throw new BadRequestException(`Error al buscar el usuario ${error.message}`);
      
    }
  }

  update(id: number, updateCompraDto: UpdateCompraDto) {
    return `This action updates a #${id} compra`;
  }

  async softDelete(id: number) {
    try {
      return `This action removes a #${id} compra`;
    } catch (error) {
      throw new BadRequestException(`Error al eliminar el usuario ${error.message}`);
    }
  }
}
