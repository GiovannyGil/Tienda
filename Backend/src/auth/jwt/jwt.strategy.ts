import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usuariosService: UsuariosService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'SECRET_KEY',
        });
    }

    // validacion del token para verificar que el usuario existe y esta autenticado
    async validate(payload: { nombreUsuario: string; sub: number }) {
        const usuario = await this.usuariosService.findOneByID(payload.sub);
        if (!usuario) {
            return null;
        }
        return usuario;
    }
}
