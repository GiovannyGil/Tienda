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
            return !!(await this.roleRepository.findOne({ where: { nombreRol, deletedAt: null } }));
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error al verificar la existencia del ROL', error.message);
        }
    }
    async create(createRoleDto) {
        try {
            const { nombreRol, estado, descripcion } = createRoleDto;
            const RolExiste = await this.verifyExistROL(createRoleDto.nombreRol);
            if (RolExiste)
                throw new common_1.BadRequestException('El rol ya existe');
            const nuevoRol = this.roleRepository.create({ nombreRol, estado, descripcion });
            if (!nuevoRol)
                throw new common_1.BadRequestException('Error al crear el ROL');
            return await this.roleRepository.save(nuevoRol);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error al crear el ROL', error.message);
        }
    }
    async findAll() {
        try {
            const roles = await this.roleRepository.find({ where: { deletedAt: null } });
            if (!roles || roles.length === 0)
                throw new common_1.BadRequestException('No hay roles registrados');
            return roles;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error al buscar los roles', error.message);
        }
    }
    async findOneByID(id) {
        try {
            const rol = await this.roleRepository.findOne({ where: { id, deletedAt: null } });
            if (!rol)
                throw new common_1.BadRequestException('El rol no existe');
            return rol;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error al buscar el rol', error.message);
        }
    }
    async findOneByNombre(nombreRol) {
        try {
            const rol = await this.roleRepository.findOne({ where: { nombreRol, deletedAt: null } });
            if (!rol)
                throw new common_1.BadRequestException('El rol no existe');
            return rol;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error al buscar el rol', error.message);
        }
    }
    async update(id, updateRoleDto) {
        try {
            const { nombreRol, estado, descripcion } = updateRoleDto;
            const role = await this.findOneByID(id);
            if (nombreRol && role.nombreRol !== nombreRol && (await this.verifyExistROL(nombreRol))) {
                throw new common_1.BadRequestException('El nombre del rol ya está en uso');
            }
            Object.assign(role, { nombreRol, estado, descripcion });
            return await this.roleRepository.save(role);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error al actualizar el rol', error.message);
        }
    }
    async softDelete(id) {
        try {
            const role = await this.findOneByID(id);
            await this.roleRepository.softRemove(role);
            return `El rol con ID ${id} ha sido eliminado (soft delete)`;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error al eliminar el ROL', error.message);
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
            throw new common_1.InternalServerErrorException('Ocurrió un error al eliminar role obsoletas.', error.message);
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