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
exports.CreateRoleDto = void 0;
const class_validator_1 = require("class-validator");
class CreateRoleDto {
}
exports.CreateRoleDto = CreateRoleDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'El nombre del rol debe ser un texto' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El nombre del rol no puede estar vacío' }),
    (0, class_validator_1.Length)(1, 20, { message: 'El nombre del rol debe tener entre 1 y 20 caracteres' }),
    __metadata("design:type", String)
], CreateRoleDto.prototype, "nombreRol", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'La descripción del rol debe ser un texto' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La descripción del rol no puede estar vacía' }),
    (0, class_validator_1.Length)(1, 100, { message: 'La descripción del rol debe tener entre 1 y 100 caracteres' }),
    __metadata("design:type", String)
], CreateRoleDto.prototype, "descripcion", void 0);
__decorate([
    (0, class_validator_1.IsInt)({ message: 'El estado del rol debe ser un número entero' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El estado del rol no puede estar vacío' }),
    (0, class_validator_1.Length)(1, 1, { message: 'El estado del rol debe tener un solo dígito' }),
    __metadata("design:type", Number)
], CreateRoleDto.prototype, "estado", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'los permisos no deben ir vacios' }),
    (0, class_validator_1.IsArray)({ message: 'los permisos son un array' }),
    __metadata("design:type", Array)
], CreateRoleDto.prototype, "permisosIds", void 0);
//# sourceMappingURL=create-role.dto.js.map