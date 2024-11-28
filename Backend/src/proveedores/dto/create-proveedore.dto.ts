import { IsDate, IsInt, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateProveedoreDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 100)
    nombreAccesor: string

    @IsString()
    @IsNotEmpty()
    @Length(1, 100)
    nombreEmpresa: string
    
    @IsString()
    @IsNotEmpty()
    @Length(1, 100)
    email: string

    @IsString()
    @IsNotEmpty()
    @Length(1, 100)
    celular: string

    @IsString()
    @IsNotEmpty()
    @Length(1, 100)
    telefono: string

    @IsString()
    @IsNotEmpty()
    @Length(1, 100)
    direccion: string

    @IsDate()
    @IsNotEmpty()
    createdAt: Date
}
