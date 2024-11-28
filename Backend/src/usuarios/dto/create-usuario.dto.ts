import { IsDate, IsInt, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateUsuarioDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 30)
    PrimerNombre: string

    @IsString()
    @IsNotEmpty()
    @Length(1, 30)
    SegundoNombre: string

    @IsString()
    @IsNotEmpty()
    @Length(1, 30)
    PrimerApellido: string

    @IsString()
    @IsNotEmpty()
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

    @IsDate()
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

    @IsDate()
    @IsNotEmpty()
    createdAt: Date;
}
