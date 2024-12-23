import { AuthService } from './auth.service';
import { Request } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(nombreUsuario: string, correo: string, clave: string): Promise<{
        access_token: string;
    }>;
    logout(req: Request): {
        message: string;
    };
}
