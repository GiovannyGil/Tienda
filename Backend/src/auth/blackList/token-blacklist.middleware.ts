import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TokenBlacklistMiddleware implements NestMiddleware {
    constructor(private readonly authService: AuthService) { }

    use(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new UnauthorizedException('No se encontró el token');
        }

        const token = authHeader.split(' ')[1];
        if (this.authService.isTokenInvalidated(token)) {
            throw new UnauthorizedException('Token inválido');
        }

        next();
    }
}