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
exports.UsuariosService = void 0;
const common_1 = require("@nestjs/common");
const usuario_entity_1 = require("./entities/usuario.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const role_entity_1 = require("../roles/entities/role.entity");
let UsuariosService = class UsuariosService {
    constructor(usuarioRepository, roleRepository) {
        this.usuarioRepository = usuarioRepository;
        this.roleRepository = roleRepository;
    }
    async create(createUsuarioDto) {
        try {
            const { rolId, ...usuarioData } = createUsuarioDto;
            const rol = await this.roleRepository.findOne({
                where: { id: rolId, deletedAt: null },
            });
            if (!rol) {
                throw new common_1.NotFoundException(`El rol con ID ${rolId} no existe`);
            }
            const nuevoUsuario = this.usuarioRepository.create({
                ...usuarioData,
                rol,
            });
            return await this.usuarioRepository.save(nuevoUsuario);
        }
        catch (error) {
            throw new common_1.BadRequestException(`Error al crear el usuario: ${error.message}`);
        }
    }
    async findAll() {
        try {
            const usuarios = await this.usuarioRepository.find({ where: { deletedAt: null }, relations: ['rol'] });
            if (!usuarios) {
                throw new common_1.NotFoundException('No hay usuarios registrados.');
            }
            return usuarios;
        }
        catch (error) {
            throw new common_1.BadRequestException(`Error al encontrar los usuarios ${error.message}`);
        }
    }
    async findOneByID(id) {
        try {
            const usuario = await this.usuarioRepository.findOne({ where: { id, deletedAt: null } });
            if (!usuario) {
                throw new common_1.NotFoundException(`El usuario con ID ${id} no existe o ya fue eliminado.`);
            }
            return usuario;
        }
        catch (error) {
            throw new common_1.BadRequestException(`Error al encontrar el usuario ${error.message}`);
        }
    }
    async findOneByNombreUsuario(nombreUsuario) {
        try {
            const usuario = await this.usuarioRepository.findOne({ where: { NombreUsuario: nombreUsuario, deletedAt: null } });
            if (!usuario) {
                throw new common_1.NotFoundException(`El usuario con NombreUsuario ${nombreUsuario} no existe o ya fue eliminado.`);
            }
            return usuario;
        }
        catch (error) {
            throw new common_1.BadRequestException(`Error al encontrar el usuario ${error.message}`);
        }
    }
    async findOneByCorreo(correo) {
        try {
            const usuario = await this.usuarioRepository.findOne({ where: { correo: correo, deletedAt: null } });
            if (!usuario) {
                throw new common_1.NotFoundException(`El usuario con correo ${correo} no existe o ya fue eliminado.`);
            }
            return usuario;
        }
        catch (error) {
            throw new common_1.BadRequestException(`Error al encontrar el usuario ${error.message}`);
        }
    }
    async update(id, updateUsuarioDto) {
        try {
            const { rolId, ...usuarioData } = updateUsuarioDto;
            const usuario = await this.usuarioRepository.findOne({
                where: { id, deletedAt: null },
                relations: ['rol'],
            });
            if (!usuario) {
                throw new common_1.NotFoundException(`El usuario con ID ${id} no existe o ya fue eliminado.`);
            }
            if (rolId && usuario.rol?.id !== rolId) {
                const nuevoRol = await this.roleRepository.findOne({ where: { id: rolId } });
                if (!nuevoRol) {
                    throw new common_1.NotFoundException(`El rol con ID ${rolId} no existe.`);
                }
                usuario.rol = nuevoRol;
            }
            Object.assign(usuario, usuarioData);
            return await this.usuarioRepository.save(usuario);
        }
        catch (error) {
            throw new common_1.BadRequestException(`Error al actualizar el usuario: ${error.message}`);
        }
    }
    async softDelete(id) {
        try {
            const usuario = await this.usuarioRepository.findOne({
                where: { id, deletedAt: null },
            });
            if (!usuario) {
                throw new common_1.NotFoundException('El usuario no existe o ya fue eliminado');
            }
            usuario.deletedAt = new Date();
            await this.usuarioRepository.save(usuario);
            return "Usuario eliminado Correctamente";
        }
        catch (error) {
            throw new common_1.BadRequestException(`Error al eliminar el usuario ${error.message}`);
        }
    }
};
exports.UsuariosService = UsuariosService;
exports.UsuariosService = UsuariosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __param(1, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UsuariosService);
//# sourceMappingURL=usuarios.service.js.map