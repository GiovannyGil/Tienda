import { IsArray, IsDate, IsInt, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateRoleDto {
    @IsString({ message: 'El nombre del rol debe ser un texto' })
    @IsNotEmpty({ message: 'El nombre del rol no puede estar vacío' })
    @Unique({ message: 'El nombre del rol ya existe' })
    @Length(1, 20, { message: 'El nombre del rol debe tener entre 1 y 20 caracteres' })
    nombreRol: string

    @IsString({ message: 'La descripción del rol debe ser un texto' })
    @IsNotEmpty({ message: 'La descripción del rol no puede estar vacía' })
    @Length(1, 100, { message: 'La descripción del rol debe tener entre 1 y 100 caracteres' })
    descripcion: string
1
    @IsInt({ message: 'El estado del rol debe ser un número entero' })
    @IsNotEmpty({ message: 'El estado del rol no puede estar vacío' })
    @Length(1, 1, { message: 'El estado del rol debe tener un solo dígito' })
    estado: number

    @IsNotEmpty({ message: 'los permisos no deben ir vacios' })
    @IsArray({ message: 'los permisos son un array' }) // Valida que sea un array
    permisosIds: number[]; // IDs de los permisos que tendrá el rol
}
