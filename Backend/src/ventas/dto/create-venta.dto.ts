import { IsDate, IsInt, IsNotEmpty, IsString, Length, IsOptional, IsArray } from "class-validator";

export class CreateVentaDto {
    @IsString({ message: 'La descripción debe ser un string' })
    @IsNotEmpty({ message: 'La descripción es requerida' })
    @Length(1, 100, { message: 'La descripción no puede tener más de 100 caracteres' })
    descripcion: string

    @IsNotEmpty({ message: 'Los productos son requeridos' })
    @IsArray({message: 'los productos van en un array'}) // Valida que sea un array
    productosIds: number[]

    @IsNotEmpty({ message: 'Los usuarios son requeridos' })
    @IsInt({ message: 'El usuario es un numero' }) 
    usuariosId: number

    @IsInt({ message: 'El monto total debe ser un número' })
    @IsNotEmpty({ message: 'El monto total es requerido' })
    montoTotal: number

    @IsString({ message: 'El método de pago debe ser un string' })
    @IsNotEmpty({ message: 'El método de pago es requerido' })
    @Length(1, 20, { message: 'El método de pago no puede tener más de 20 caracteres' })
    metodoPago: string
}
