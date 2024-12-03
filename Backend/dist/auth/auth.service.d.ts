import { UsuariosService } from 'src/usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
export declare class AuthService {
    private readonly usuariosService;
    private readonly jwtService;
    constructor(usuariosService: UsuariosService, jwtService: JwtService);
    validateUser(nombreUsuario: string, clave: string): Promise<Usuario | null>;
    login(nombreUsuario: string, clave: string): Promise<{
        accessToken: string;
    }>;
    logout(): Promise<{
        message: string;
    }>;
}
