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
    }
    async validateUser(nombreUsuario, clave) {
        const usuario = await this.usuariosService.findOneByNombreUsuario(nombreUsuario);
        if (usuario && (await bcrypt.compare(clave, usuario.clave))) {
            return usuario;
        }
        return null;
    }
    async login(nombreUsuario, clave) {
        const usuario = await this.validateUser(nombreUsuario, clave);
        if (!usuario) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        const payload = { sub: usuario.id, nombreUsuario: usuario.NombreUsuario, rol: usuario.rol?.nombre };
        const token = this.jwtService.sign(payload);
        return { accessToken: token };
    }
    async logout() {
        return { message: 'Logout exitoso' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [usuarios_service_1.UsuariosService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map