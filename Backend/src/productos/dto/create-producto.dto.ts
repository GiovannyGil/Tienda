import { IsDate, IsInt, IsNotEmpty, IsString, Length, IsOptional } from "class-validator";

export class CreateProductoDto {
    @IsString({ message: 'El código debe ser un texto' })
    @IsNotEmpty({ message: 'El código no debe estar vacío' })
    @Length(1, 20, { message: 'El código debe tener entre 1 y 20 caracteres' })
    nombre: string

    @IsString({ message: 'La descripción debe ser un texto' })
    @IsNotEmpty({ message: 'La descripción no debe estar vacía' })
    @Length(1, 100, { message: 'La descripción debe tener entre 1 y 100 caracteres' })
    descripcion: string

    @IsInt({ message: 'El precio debe ser un número entero' })
    @IsNotEmpty({ message: 'El precio no debe estar vacío' })
    precio: number

    @IsString({ message: 'La marca debe ser un texto' })
    @IsOptional({ message: 'La marca es opcional' })
    marca: string

    @IsInt({ message: 'El stock debe ser un número entero' })
    @IsNotEmpty({ message: 'El stock no debe estar vacío' })
    stock: number

    @IsInt({ message: 'El estado debe ser un número entero' })
    @IsNotEmpty({ message: 'El estado no debe estar vacío' })
    @Length(1, 1, { message: 'El estado debe tener 1 caracter' })
    estado: number

    @IsDate({ message: 'La fecha de vencimiento debe ser tipo fecha' })
    @IsOptional({ message: 'La fecha de vencimiento es opcional' })
    fechaVencimiento: Date

    @IsInt({ message: 'El id de la categoría debe ser un número entero' })
    @IsNotEmpty({ message: 'El id de la categoría no debe estar vacío' })
    categoriaId: number
}
