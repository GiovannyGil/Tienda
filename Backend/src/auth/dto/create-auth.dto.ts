import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAuthDto {
    @IsString()
    @IsNotEmpty()
    nombreUsuario: string;

    @IsString()
    @IsNotEmpty()
    clave: string;
}
