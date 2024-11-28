import { IsDate, IsInt, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateCategoriaDto {
    @IsString()
    @IsNotEmpty()
    @Length(1,50)
    nombre: string

    @IsString()
    @IsNotEmpty()
    @Length(1, 100)
    descripcion: string

    @IsInt()
    @IsNotEmpty()
    @Length(1)
    estado: number
}
