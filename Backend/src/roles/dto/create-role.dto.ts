import { IsArray, IsDate, IsInt, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateRoleDto {
    @IsString()
    @IsNotEmpty()
    @Length(1,20)
    nombreRol: string

    @IsString()
    @IsNotEmpty()
    @Length(1, 100)
    descripcion: string

    @IsInt()
    @IsNotEmpty()
    @Length(1)
    estado: number

    @IsNotEmpty()
    @IsArray() // Valida que sea un array
    permisosIds: number[]; // IDs de los permisos que tendrá el rol
}
