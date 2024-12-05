import { UsuariosService } from 'src/usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly usuariosService;
    private readonly jwtService;
    private invalidatedTokens;
    constructor(usuariosService: UsuariosService, jwtService: JwtService);
    login(nombreUsuario: string, clave: string): Promise<{
        access_token: string;
    }>;
    logout(token: string): Promise<{
        message: string;
    }>;
    isTokenInvalidated(token: string): boolean;
}
