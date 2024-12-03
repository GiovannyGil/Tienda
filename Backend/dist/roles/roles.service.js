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
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const role_entity_1 = require("./entities/role.entity");
const typeorm_2 = require("typeorm");
const schedule_1 = require("@nestjs/schedule");
let RolesService = class RolesService {
    constructor(roleRepository) {
        this.roleRepository = roleRepository;
    }
    async verifyExistROL(nombreRol) {
        try {
            const RolExiste = await this.roleRepository.findOne({ where: { nombreRol, deletedAt: null } });
            return !!RolExiste;
        }
        catch (error) {
            throw new Error('Error al verificar la existencia del ROL');
        }
    }
    async create(createRoleDto) {
        try {
            const RolExiste = await this.verifyExistROL(createRoleDto.nombreRol);
            if (RolExiste)
                throw new common_1.BadRequestException('El rol ya existe');
            const NuevoRol = this.roleRepository.create(createRoleDto);
            if (!NuevoRol)
                return null;
            return await this.roleRepository.save(NuevoRol);
        }
        catch (error) {
            throw new Error('Error al crear el ROL');
        }
    }
    async findAll() {
        try {
            const roles = await this.roleRepository.find({ where: { deletedAt: null } });
            if (!roles || roles.length === 0)
                return [];
            return roles;
        }
        catch (error) {
            throw new Error('Error al buscar los roles');
        }
    }
    async findOneByID(id) {
        try {
            const rol = await this.roleRepository.findOneBy({ id, deletedAt: null });
            if (!rol)
                return null;
            return rol;
        }
        catch (error) {
            throw new Error('Error al buscar el rol');
        }
    }
    async findOneByNombre(nombreRol) {
        try {
            const rol = await this.roleRepository.findOneBy({ nombreRol, deletedAt: null });
            if (!rol)
                return null;
            return rol;
        }
        catch (error) {
            throw new Error('Error al buscar el rol');
        }
    }
    async update(id, updateRoleDto) {
        try {
            const rol = await this.roleRepository.update(id, updateRoleDto);
            if (!rol)
                return null;
            return rol;
        }
        catch (error) {
            throw new Error('Error al actualizar el rol');
        }
    }
    async softDelete(id) {
        try {
            const rol = await this.findOneByID(id);
            if (!rol) {
                throw new common_1.BadRequestException('El rol no existe o ya está eliminado');
            }
            rol.deletedAt = new Date();
            await this.roleRepository.save(rol);
            return "ROL eliminado Correctamente";
        }
        catch (error) {
            throw new Error('Error al eliminar el ROL');
        }
    }
    async cleanDeletedRecords() {
        try {
            const thresholdDate = new Date();
            thresholdDate.setDate(thresholdDate.getDate() - 30);
            const roleParaEliminar = await this.roleRepository.find({
                where: {
                    deletedAt: (0, typeorm_2.In)([(0, typeorm_2.LessThan)(thresholdDate)]),
                },
            });
            if (roleParaEliminar.length > 0) {
                await this.roleRepository.remove(roleParaEliminar);
                console.log(`Eliminadas ${roleParaEliminar.length} role obsoletas.`);
            }
        }
        catch (error) {
            console.error('Error al limpiar registros eliminados:', error);
            throw new common_1.InternalServerErrorException('Ocurrió un error al eliminar role obsoletas.');
        }
    }
};
exports.RolesService = RolesService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RolesService.prototype, "cleanDeletedRecords", null);
exports.RolesService = RolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RolesService);
//# sourceMappingURL=roles.service.js.map