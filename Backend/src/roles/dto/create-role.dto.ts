import { IsDate, IsDateString, IsEmail, IsIn, IsInt, isNotEmpty, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

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

    @IsDate()
    @IsNotEmpty()
    createdAt: Date;
}
