import { IsDate, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreateUsuarioDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 30)
    PrimerNombre: string

    @IsString()
    @IsOptional()
    @Length(1, 30)
    SegundoNombre: string

    @IsString()
    @IsNotEmpty()
    @Length(1, 30)
    PrimerApellido: string

    @IsString()
    @IsOptional()
    @Length(1, 30)
    SegundoApellido: string

    @IsString()
    @IsNotEmpty()
    @Length(1, 100)
    NombreUsuario: string

    @IsInt()
    @IsNotEmpty()
    rolId: number

    @IsString()
    @IsNotEmpty()
    @Length(1, 20)
    clave: string

    @IsDate()
    @IsNotEmpty()
    añoNace: Date;

    @IsInt()
    @IsNotEmpty()
    genero: number

    @IsString()
    @IsNotEmpty()
    @Length(1, 11)
    celular: string

    @IsString()
    @IsNotEmpty()
    @Length(1, 30)
    correo: string
}
