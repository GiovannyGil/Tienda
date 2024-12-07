import { IsDate, IsInt, IsNotEmpty, IsString, Length } from "class-validator";
import { Unique } from "typeorm";

export class CreatePermisoDto {
    @IsString({ message: 'El nombre del permiso debe ser un texto' })
    @IsNotEmpty({ message: 'El nombre del permiso no debe estar vacío' })
    @Length(1, 20, { message: 'El nombre del permiso debe tener entre 1 y 20 caracteres' })
    nombrePermiso: string

    @IsString({ message: 'La descripción del permiso debe ser un texto' })
    @IsNotEmpty({ message: 'La descripción del permiso no debe estar vacía' })
    @Length(1, 100, { message: 'La descripción del permiso debe tener entre 1 y 100 caracteres' })
    descripcion: string

    @IsInt({ message: 'El estado del permiso debe ser un número entero' })
    @IsNotEmpty({ message: 'El estado del permiso no debe estar vacío' })
    @Length(1, 1, { message: 'El estado del permiso debe tener 1 caracteres' })
    estado: number
}
