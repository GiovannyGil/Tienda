import { IsDate, IsInt, IsNotEmpty, IsString, Length } from "class-validator";

export class CreatePermisoDto {
    @IsString()
    @IsNotEmpty()
    @Length(1,20)
    nombrePermiso: string

    @IsString()
    @IsNotEmpty()
    @Length(1, 100)
    descripcion: string

    @IsInt()
    @IsNotEmpty()
    @Length(1)
    estado: number
}
