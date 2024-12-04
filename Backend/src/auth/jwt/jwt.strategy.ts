import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'SECRET_KEY', // Usa la misma clave secreta que en el módulo
        });
    }

    async validate(payload: any) {
        return { id: payload.sub, nombreUsuario: payload.nombreUsuario, rol: payload.rol };
    }
}
