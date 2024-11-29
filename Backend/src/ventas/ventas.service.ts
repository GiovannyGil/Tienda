import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { Venta } from './entities/venta.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class VentasService {

  constructor(
    @InjectRepository(Venta) private ventasRepository: Repository<Venta>
  ) {}

  create(createVentaDto: CreateVentaDto) {
    return 'This action adds a new venta';
  }

  async findAll() {
    try {
      // buscar las ventas
      const ventas = await this.ventasRepository.find({ where: {deletedAt: null} });
      // si no encuentra nada
      if(!ventas) { throw new NotFoundException('No se encontraron ventas') }
      // devolver las ventas
      return ventas;
    } catch (error) {
      throw new BadRequestException('Error al buscar las ventas')
    }
  }

  async findOneByID(id: number) {
    try {
      // buscar la venta por id
      const venta = await this.ventasRepository.findOne({ where: {id, deletedAt: null} })
      // si no encuentra nada
      if(!venta) { throw new NotFoundException('No se encontro la venta') }
      // devolver la venta
      return venta
    } catch (error) {
      throw new BadRequestException('Error al buscar la venta')
    }
  }

  update(id: number, updateVentaDto: UpdateVentaDto) {
    return `This action updates a #${id} venta`;
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
      throw new BadRequestException('Error al eliminar la venta')
    }
  }
}
