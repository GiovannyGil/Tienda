import { ArrayNotEmpty, IsArray, IsDate, IsInt, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreateProveedoreDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 100)
    nombreAsesor: string

    @IsString()
    @IsNotEmpty()
    @Length(1, 100)
    nombreEmpresa: string

    @IsString()
    @IsNotEmpty()
    @Length(1, 100)
    email: string

    @IsString()
    @IsNotEmpty()
    @Length(1, 100)
    celular: string

    @IsString()
    @IsNotEmpty()
    @Length(1, 100)
    telefono: string

    @IsString()
    @IsNotEmpty()
    @Length(1, 100)
    direccion: string

    @IsArray()
    @IsInt({ each: true })
    @IsOptional()
    categoriasIds?: number[];
}
