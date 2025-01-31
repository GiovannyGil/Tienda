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
exports.Usuario = void 0;
const compra_entity_1 = require("../../compras/entities/compra.entity");
const role_entity_1 = require("../../roles/entities/role.entity");
const venta_entity_1 = require("../../ventas/entities/venta.entity");
const typeorm_1 = require("typeorm");
const bcrypt = require("bcrypt");
let Usuario = class Usuario {
    setCreatedAt() {
        this.createdAt = new Date();
    }
    setUpdatedAt() {
        this.updatedAt = new Date();
    }
    async hashPassword() {
        if (this.clave && !this.clave.startsWith('$2b$')) {
            const salt = await bcrypt.genSalt(10);
            this.clave = await bcrypt.hash(this.clave, salt);
        }
    }
};
exports.Usuario = Usuario;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id', type: 'int' }),
    __metadata("design:type", Number)
], Usuario.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 30, nullable: false, name: 'primerNombre' }),
    __metadata("design:type", String)
], Usuario.prototype, "PrimerNombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 30, nullable: true, name: 'segundoNombre' }),
    __metadata("design:type", String)
], Usuario.prototype, "SegundoNombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 30, nullable: false, name: 'primerApellido' }),
    __metadata("design:type", String)
], Usuario.prototype, "PrimerApellido", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 30, nullable: true, name: 'segundoApellido' }),
    __metadata("design:type", String)
], Usuario.prototype, "SegundoApellido", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: false, unique: true, name: 'nombreUsuario' }),
    __metadata("design:type", String)
], Usuario.prototype, "NombreUsuario", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => role_entity_1.Role, (role) => role.usuarios),
    (0, typeorm_1.JoinColumn)({ name: "rolId" }),
    __metadata("design:type", role_entity_1.Role)
], Usuario.prototype, "rol", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: false, name: 'clave' }),
    __metadata("design:type", String)
], Usuario.prototype, "clave", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", nullable: false, name: 'añoNace' }),
    __metadata("design:type", Date)
], Usuario.prototype, "a\u00F1oNace", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: false, name: 'genero' }),
    __metadata("design:type", Number)
], Usuario.prototype, "genero", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 11, nullable: false, unique: true, name: 'celular' }),
    __metadata("design:type", String)
], Usuario.prototype, "celular", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 30, nullable: false, unique: true, name: 'correo' }),
    __metadata("design:type", String)
], Usuario.prototype, "correo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => venta_entity_1.Venta, (venta) => venta.usuario),
    __metadata("design:type", Array)
], Usuario.prototype, "ventas", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => compra_entity_1.Compra, (compra) => compra.usuario),
    __metadata("design:type", Array)
], Usuario.prototype, "compras", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", nullable: false }),
    __metadata("design:type", Date)
], Usuario.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", nullable: true }),
    __metadata("design:type", Date)
], Usuario.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", nullable: true }),
    __metadata("design:type", Date)
], Usuario.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Usuario.prototype, "setCreatedAt", null);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Usuario.prototype, "setUpdatedAt", null);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Usuario.prototype, "hashPassword", null);
exports.Usuario = Usuario = __decorate([
    (0, typeorm_1.Entity)({ name: 'Usuarios' })
], Usuario);
//# sourceMappingURL=usuario.entity.js.map