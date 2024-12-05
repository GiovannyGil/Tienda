import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(nombreUsuario: string, clave: string): Promise<{
        access_token: string;
    }>;
}
