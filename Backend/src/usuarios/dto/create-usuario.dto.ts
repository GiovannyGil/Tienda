import { IsDate, IsEmail, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreateUsuarioDto {
    @IsString({ message: 'El primer nombre debe ser un string' })
    @IsNotEmpty({ message: 'El primer nombre es requerido' })
    @Length(1, 30, { message: 'El primer nombre no puede tener más de 30 caracteres' })
    PrimerNombre: string

    @IsString({ message: 'El segundo nombre debe ser un string' })
    @IsOptional({ message: 'El segundo nombre es opcional' })
    @Length(1, 30, { message: 'El segundo nombre no puede tener más de 30 caracteres' })
    SegundoNombre: string

    @IsString({ message: 'El primer apellido debe ser un string' })
    @IsNotEmpty({ message: 'El primer apellido es requerido' })
    @Length(1, 30, { message: 'El primer apellido no puede tener más de 30 caracteres' })
    PrimerApellido: string

    @IsString({ message: 'El segundo apellido debe ser un string' })
    @IsOptional({ message: 'El segundo apellido es opcional' })
    @Length(1, 30, { message: 'El segundo apellido no puede tener más de 30 caracteres' })
    SegundoApellido: string

    @IsString({ message: 'El nombre de usuario debe ser un string' })
    @IsNotEmpty({ message: 'El nombre de usuario es requerido' })
    @Unique({ message: 'El nombre de usuario ya está en uso' })
    @Length(1, 100, { message: 'El nombre de usuario no puede tener más de 100 caracteres' })
    NombreUsuario: string

    @IsInt({ message: 'El rol debe ser un número' })
    @IsNotEmpty({ message: 'El rol es requerido' })
    rolId: number

    @IsString({ message: 'La clave debe ser un string' })
    @IsNotEmpty({ message: 'La clave es requerida' })
    @Length(6, 100, { message: 'La clave debe tener al menos 6 caracteres' })
    clave: string

    @IsDate({ message: 'La fecha de nacimiento no es válida' })
    @IsNotEmpty({ message: 'La fecha de nacimiento es requerida' })
    añoNace: Date;

    @IsInt({ message: 'El género debe ser un número' })
    @IsNotEmpty({ message: 'El género es requerido' })
    genero: number
    // 1 : Masculino | 2 : Femenino | 3 : Otro

    @IsString()
    @IsNotEmpty({ message: 'El número de cédula es requerido' })
    @Length(1, 11, { message: 'El número de cédula no puede tener más de 11 caracteres' })
    celular: string

    @IsEmail( {}, { message: 'El correo electrónico no es válido' })
    @IsNotEmpty({ message: 'El correo electrónico es requerido' })
    @Length(1, 30, { message: 'El correo electrónico no puede tener más de 30 caracteres' })
    correo: string
}
