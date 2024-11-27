import { IsDate, IsInt, IsNotEmpty, IsString, Length, IsOptional } from "class-validator";

export class CreateProductoDto {
    @IsString()
    @IsNotEmpty()
    @Length(1,20)
    nombre: string

    @IsString()
    @IsNotEmpty()
    @Length(1, 100)
    descripcion: string

    @IsInt()
    @IsNotEmpty()
    precio: number

    @IsString()
    @IsOptional()
    marca: string

    @IsInt()
    @IsNotEmpty()
    stock: number

    @IsInt()
    @IsNotEmpty()
    @Length(1)
    estado: number

    @IsDate()
    @IsOptional()
    fechaVencimiento: Date

    @IsDate()
    @IsNotEmpty()
    createdAt: Date;
}
