import { IsDate, IsInt, IsNotEmpty, IsString, Length, IsOptional, IsArray } from "class-validator";

export class CreateCompraDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 100)
    descripcion: string

    @IsInt()
    @IsNotEmpty()
    @IsNotEmpty()
    proveedorIds: number[]

    @IsNotEmpty()
    @IsArray() // Valida que sea un array
    productosIds: number[]

    @IsNotEmpty()
    @IsArray() // Valida que sea un array
    usuariosId: number

    @IsInt()
    @IsNotEmpty()
    montoTotal: number

    @IsString()
    @IsNotEmpty()
    @Length(1, 100)
    metodoPago: string
}
