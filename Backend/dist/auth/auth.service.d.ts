import { UsuariosService } from 'src/usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly usuariosService;
    private readonly jwtService;
    private invalidatedTokens;
    constructor(usuariosService: UsuariosService, jwtService: JwtService);
    login(nombreUsuario: string, correo: string, clave: string): Promise<{
        access_token: string;
    }>;
    logout(token: string): void;
    invalidateToken(token: string): void;
    isTokenInvalidated(token: string): boolean;
}
