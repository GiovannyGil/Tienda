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
let RolesService = class RolesService {
    constructor(roleRepository) {
        this.roleRepository = roleRepository;
    }
    async verifyExistROL(nombreRol) {
        try {
            const RolExiste = await this.roleRepository.findOne({ where: { nombreRol, deleteAt: null } });
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
            const roles = await this.roleRepository.find({ where: { deleteAt: null } });
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
            const rol = await this.roleRepository.findOneBy({ id, deleteAt: null });
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
            const rol = await this.roleRepository.findOneBy({ nombreRol });
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
            rol.deleteAt = new Date();
            await this.roleRepository.save(rol);
            return "ROL eliminado Correctamente";
        }
        catch (error) {
            throw new Error('Error al eliminar el ROL');
        }
    }
    async remove() {
        try {
            const fechaLimite = new Date();
            fechaLimite.setDate(fechaLimite.getDate() - 30);
            const rolesParaEliminar = await this.roleRepository.find({
                where: { deleteAt: (0, typeorm_2.LessThan)(fechaLimite) },
            });
            if (rolesParaEliminar.length > 0) {
                await this.roleRepository.delete({ deleteAt: (0, typeorm_2.LessThan)(fechaLimite) });
                console.warn(`Eliminados permanentemente los ${rolesParaEliminar.length} roles`);
            }
            else {
                console.warn('No hay Roles para Eliminar');
            }
        }
        catch (error) {
            throw new Error('Error al eliminar el rol');
        }
    }
};
exports.RolesService = RolesService;
exports.RolesService = RolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RolesService);
//# sourceMappingURL=roles.service.js.map