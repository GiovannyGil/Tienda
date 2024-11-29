import { IsDate, IsInt, IsNotEmpty, IsString, Length, IsOptional, IsArray } from "class-validator";

export class CreateVentaDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 100)
    descripcion: string

    @IsNotEmpty()
    @IsArray() // Valida que sea un array
    productosIds: number[]

    @IsNotEmpty()
    @IsArray() // Valida que sea un array
    usuariosIds: number[]

    @IsInt()
    @IsNotEmpty()
    montoTotal: number

    @IsString()
    @IsNotEmpty()
    @Length(1, 100)
    metodoPago: string
}
