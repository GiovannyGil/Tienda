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
    @Length(6, 100)
    clave: string

    @IsDate()
    @IsNotEmpty()
    añoNace: Date;

    @IsInt()
    @IsNotEmpty()
    genero: number
    // 1 : Masculino | 2 : Femenino | 3 : Otro

    @IsString()
    @IsNotEmpty()
    @Length(1, 11)
    celular: string

    @IsString()
    @IsNotEmpty()
    @Length(1, 30)
    correo: string
}
