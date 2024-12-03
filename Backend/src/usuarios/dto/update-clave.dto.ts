import { IsNotEmpty, IsString, Length, MinLength } from "class-validator";

export class UpdateClaveDto {
    @IsString()
    @IsNotEmpty()
    @Length(6, 100, { message: 'La clave debe tener entre 6 y 20 caracteres' })
    nuevaClave: string;

    @IsString()
    @IsNotEmpty()
    @Length(6, 100, {message: 'La clave debe tener entre 6 y 20 caracteres' })
    claveActual: string;
}