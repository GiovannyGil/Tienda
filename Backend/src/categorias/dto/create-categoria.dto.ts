import { IsDate, IsInt, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateCategoriaDto {
    @IsString({ message: "El nombre de la categoría debe ser un texto" })
    @IsNotEmpty({ message: "El nombre de la categoría no puede estar vacío" })
    @Unique({ message: "El nombre de la categoría ya existe" })
    @Length(1, 50, { message: "El nombre de la categoría debe tener entre 1 y 50 caracteres" })
    nombre: string

    @IsString({ message: "La descripción de la categoría debe ser un texto" })
    @IsNotEmpty({ message: "La descripción de la categoría no puede estar vacía" })
    @Length(1, 100, { message: "La descripción de la categoría debe tener entre 1 y 100 caracteres" })
    descripcion: string

    @IsInt({ message: "El estado de la categoría debe ser un número entero" })
    @IsNotEmpty({ message: "El estado de la categoría no puede estar vacío" })
    @Length(1, 1, { message: "El estado de la categoría debe tener 1 caracter" })
    estado: number
}
