import { IsDate, IsInt, IsNotEmpty, IsString, Length, IsOptional } from "class-validator";

export class CreateCompraDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 100)
    descripcion: string

    @IsInt()
    @IsNotEmpty()
    @IsNotEmpty()
    proveedorId: number

    @IsInt()
    @IsNotEmpty()
    @IsNotEmpty()
    productoid: number

    @IsInt()
    @IsNotEmpty()
    @IsNotEmpty()
    usuarioId: number

    @IsInt()
    @IsNotEmpty()
    montoTotal: number

    @IsString()
    @IsNotEmpty()
    @Length(1, 100)
    metodoPago: string

    @IsDate()
    @IsNotEmpty()
    createdAt: Date
}
