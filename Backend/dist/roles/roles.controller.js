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
exports.RolesController = void 0;
const common_1 = require("@nestjs/common");
const roles_service_1 = require("./roles.service");
const create_role_dto_1 = require("./dto/create-role.dto");
const update_role_dto_1 = require("./dto/update-role.dto");
const jwt_guard_1 = require("../auth/jwt/jwt.guard");
const roles_guard_1 = require("./guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let RolesController = class RolesController {
    constructor(rolesService) {
        this.rolesService = rolesService;
    }
    async create(createRoleDto) {
        return await this.rolesService.create(createRoleDto);
    }
    async findAll() {
        return await this.rolesService.findAll();
    }
    async findOneByID(id) {
        return await this.rolesService.findOneByID(+id);
    }
    async findOneByNombre(nombreRol) {
        return await this.rolesService.findOneByNombre(nombreRol);
    }
    async update(id, updateRoleDto) {
        return await this.rolesService.update(+id, updateRoleDto);
    }
    async remove(id) {
        return await this.rolesService.softDelete(id);
    }
    cleanDeletedRecords() {
        return this.rolesService.cleanDeletedRecords();
    }
};
exports.RolesController = RolesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_role_dto_1.CreateRoleDto]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('Administrador', 'Empleado', 'Contador', 'Analista'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)('Administrador', 'Empleado', 'Contador', 'Analista'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "findOneByID", null);
__decorate([
    (0, common_1.Get)(':nombreRol'),
    (0, roles_decorator_1.Roles)('Administrador', 'Empleado', 'Contador', 'Analista'),
    __param(0, (0, common_1.Param)('nombreRol')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "findOneByNombre", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)('Administrador'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_role_dto_1.UpdateRoleDto]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('Administrador'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "remove", null);
__decorate([
    (0, common_1.Delete)('cleanup'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RolesController.prototype, "cleanDeletedRecords", null);
exports.RolesController = RolesController = __decorate([
    (0, common_1.Controller)('roles'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [roles_service_1.RolesService])
], RolesController);
//# sourceMappingURL=roles.controller.js.map