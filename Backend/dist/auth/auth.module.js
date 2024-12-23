"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const usuarios_module_1 = require("../usuarios/usuarios.module");
const jwt_1 = require("@nestjs/jwt");
const jwt_strategy_1 = require("./jwt/jwt.strategy");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("./guards/roles.guard");
const jwt_guard_1 = require("./jwt/jwt.guard");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || 'SECRET-KEY',
                signOptions: { expiresIn: '60s' },
            }),
            usuarios_module_1.UsuariosModule,
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || 'SECRET_KEY',
                signOptions: { expiresIn: '1h' },
            })
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            jwt_strategy_1.JwtStrategy,
            jwt_guard_1.JwtAuthGuard,
            roles_guard_1.RolesGuard
        ],
        exports: [jwt_strategy_1.JwtStrategy, jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, jwt_1.JwtModule]
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map