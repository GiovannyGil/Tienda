"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const usuarios_service_1 = require("../usuarios/usuarios.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(usuariosService, jwtService) {
        this.usuariosService = usuariosService;
        this.jwtService = jwtService;
        this.invalidatedTokens = new Set();
    }
    async login(nombreUsuario, clave) {
        try {
            const usuario = await this.usuariosService.findOneByNombreUsuario(nombreUsuario);
            if (!usuario) {
                throw new common_1.UnauthorizedException('Usuario Inválido');
            }
            const isPasswordValid = await bcrypt.compare(clave, usuario.clave);
            if (!isPasswordValid) {
                throw new common_1.UnauthorizedException('Clave inválida');
            }
            await usuario.rol;
            const payload = {
                sub: usuario.id,
                nombreUsuario: usuario.NombreUsuario,
                rol: usuario.rol?.nombreRol || 'Sin rol'
            };
            const token = await this.jwtService.signAsync(payload, {
                secret: process.env.JWT_SECRET,
                expiresIn: '1h'
            });
            return { access_token: token };
        }
        catch (error) {
            console.error('Error en login:', error);
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
    }
    logout(token) {
        try {
            this.invalidatedTokens.add(token);
        }
        catch (error) {
            throw new common_1.UnauthorizedException('No se pudo invalidar el token 1');
        }
    }
    invalidateToken(token) {
        try {
            this.invalidatedTokens.add(token);
        }
        catch (error) {
            throw new common_1.UnauthorizedException('No se pudo invalidar el token 2');
        }
    }
    isTokenInvalidated(token) {
        try {
            return this.invalidatedTokens.has(token);
        }
        catch (error) {
            throw new common_1.UnauthorizedException('No se pudo validar el token 3');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [usuarios_service_1.UsuariosService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map