import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly usuariosService: UsuariosService,
        private readonly authService: AuthService, // Inyectamos AuthService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'SECRET_KEY',
            passReqToCallback: true, // Importante: habilitar acceso a la request
        });
    }

    // validacion del token para verificar que el usuario existe y esta autenticado
    async validate(req: Request, payload: { nombreUsuario: string; sub: number }) {
        // Extraer el token directamente de la cabecera Authorization
        const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
        if (this.authService.isTokenInvalidated(token)) {
            throw new UnauthorizedException('Token inválido');
        }

        // Validar usuario
        const usuario = await this.usuariosService.findOneByID(payload.sub);
        if (!usuario) {
            throw new UnauthorizedException('Usuario no encontrado');
        }
        return usuario; // Devuelve el usuario validado
    }
}
