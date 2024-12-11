import { ArrayMinSize, ArrayNotEmpty, IsArray, IsDate, IsInt, IsNotEmpty, IsString, Length, Max, Min, } from "class-validator";
import { Unique } from "typeorm";

export class CreateRoleDto {
    @IsString({ message: 'El nombre del rol debe ser un texto' })
    @IsNotEmpty({ message: 'El nombre del rol no puede estar vacío' })
    @Length(1, 20, { message: 'El nombre del rol debe tener entre 1 y 20 caracteres' })
    nombreRol: string

    @IsString({ message: 'La descripción del rol debe ser un texto' })
    @IsNotEmpty({ message: 'La descripción del rol no puede estar vacía' })
    @Length(1, 100, { message: 'La descripción del rol debe tener entre 1 y 100 caracteres' })
    descripcion: string
1
    @IsInt({ message: 'El estado del rol debe ser un número entero' })
    @IsNotEmpty({ message: 'El estado del rol no puede estar vacío' })
    @Min(1, { message: 'El estado debe ser al menos 1 caracter' })
    @Max(1, { message: 'El estado debe ser máximo 1 caracter' })
    estado: number

    @IsNotEmpty({ message: 'los permisos no deben ir vacios' })
    @IsArray({ message: 'Los permisos deben ser un array' })
    @ArrayNotEmpty({ message: 'Los permisos no pueden estar vacios' })
    @ArrayMinSize(1, { message: 'Debe haber al menos un permiso asociado' })
    @IsInt({ each: true, message: 'Cada ID de permiso debe ser un número entero' })
    permisosIds: number[]; // IDs de los permisos que tendrá el rol
}
