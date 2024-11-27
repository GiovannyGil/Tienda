import { IsDate, IsInt, IsNotEmpty, IsString, Length, IsOptional } from "class-validator";

export class CreateVentaDto {
    @IsDate()
    @IsNotEmpty()
    fechaVenta: Date

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
