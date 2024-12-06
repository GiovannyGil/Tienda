import { ArrayNotEmpty, IsArray, IsDate, IsInt, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import { Unique } from "typeorm";

export class CreateProveedoreDto {
    @IsString({ message: 'El nombre del asesor debe ser un texto' })
    @IsNotEmpty({ message: 'El nombre del asesor no puede estar vacío' })
    @Length(1, 30, { message: 'El nombre del asesor debe tener entre 1 y 30 caracteres' })
    nombreAsesor: string

    @IsString({ message: 'El nombre de la empresa debe ser un texto' })
    @IsNotEmpty({ message: 'El nombre de la empresa no puede estar vacío' })
    @Unique({ message: 'El nombre de la empresa ya está en uso' })
    @Length(1, 100, { message: 'El nombre de la empresa debe tener entre 1 y 100 caracteres' })
    nombreEmpresa: string

    @IsString({ message: 'El nombre del contacto debe ser un texto' })
    @IsNotEmpty({ message: 'El nombre del contacto no puede estar vacío' })
    @Unique({ message: 'El nombre email ya está en uso' })
    @Length(1, 30, { message: 'El nombre del contacto debe tener entre 1 y 30 caracteres' })
    email: string

    @IsString({ message: 'El celular debe ser un texto' })
    @IsNotEmpty({ message: 'El celular no puede estar vacío' })
    @Unique({ message: 'El celular ya está en uso' })
    @Length(1, 11, { message: 'El celular debe tener entre 1 y 11 caracteres' })
    celular: string

    @IsString({ message: 'El teléfono debe ser un texto' })
    @IsNotEmpty({ message: 'El teléfono no puede estar vacío' })
    @Unique({ message: 'El teléfono ya está en uso' })
    @Length(1, 11, { message: 'El teléfono debe tener entre 1 y 11 caracteres' })
    telefono: string

    @IsString({ message: 'La dirección debe ser un texto' })
    @IsNotEmpty({ message: 'La dirección no puede estar vacía' })
    @Length(1, 100, { message: 'La dirección debe tener entre 1 y 100 caracteres' })
    direccion: string

    @IsArray({ message: 'Las categorías son un array' })
    @IsInt({ each: true, message: 'Las categorías deben ser números enteros' })
    @IsOptional({ message: 'Las categorías son opcionales' })
    categoriasIds?: number[];
}
