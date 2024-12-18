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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosController = void 0;
const common_1 = require("@nestjs/common");
const usuarios_service_1 = require("./usuarios.service");
const create_usuario_dto_1 = require("./dto/create-usuario.dto");
const update_usuario_dto_1 = require("./dto/update-usuario.dto");
const update_clave_dto_1 = require("./dto/update-clave.dto");
const jwt_guard_1 = require("../auth/jwt/jwt.guard");
const roles_decorator_1 = require("../roles/decorators/roles.decorator");
const roles_guard_1 = require("../roles/guards/roles.guard");
let UsuariosController = class UsuariosController {
    constructor(usuariosService) {
        this.usuariosService = usuariosService;
    }
    create(createUsuarioDto) {
        return this.usuariosService.create(createUsuarioDto);
    }
    findAll() {
        return this.usuariosService.findAll();
    }
    findOneByID(id) {
        return this.usuariosService.findOneByID(+id);
    }
    findOneByNombreUsuario(NombreUsuario) {
        return this.usuariosService.findOneByNombreUsuario(NombreUsuario);
    }
    findOneByCorreo(correo) {
        return this.usuariosService.findOneByCorreo(correo);
    }
    update(id, updateUsuarioDto) {
        return this.usuariosService.update(+id, updateUsuarioDto);
    }
    updatePassword(id, updateClaveDto) {
        return this.usuariosService.updatePassword(+id, updateClaveDto);
    }
    remove(id) {
        return this.usuariosService.softDelete(+id);
    }
    cleanDeletedRecords() {
        return this.usuariosService.cleanDeletedRecords();
    }
};
exports.UsuariosController = UsuariosController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('Administrador'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_usuario_dto_1.CreateUsuarioDto]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('Administrador', 'empleado', 'Contador', 'Analista'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)('Administrador', 'empleado', 'Contador', 'Analista'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "findOneByID", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)('Administrador', 'empleado', 'Contador', 'Analista'),
    __param(0, (0, common_1.Param)('NombreUsuario')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "findOneByNombreUsuario", null);
__decorate([
    (0, common_1.Get)(':correo'),
    (0, roles_decorator_1.Roles)('Administrador', 'empleado', 'Contador', 'Analista'),
    __param(0, (0, common_1.Param)('correo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "findOneByCorreo", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)('Administrador'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_usuario_dto_1.UpdateUsuarioDto]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/cambiar-clave'),
    (0, roles_decorator_1.Roles)('Administrador', 'empleado', 'Contador', 'Analista'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_clave_dto_1.UpdateClaveDto]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('Administrador'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "remove", null);
__decorate([
    (0, common_1.Delete)('cleanup'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "cleanDeletedRecords", null);
exports.UsuariosController = UsuariosController = __decorate([
    (0, common_1.Controller)('usuarios'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [usuarios_service_1.UsuariosService])
], UsuariosController);
//# sourceMappingURL=usuarios.controller.js.map