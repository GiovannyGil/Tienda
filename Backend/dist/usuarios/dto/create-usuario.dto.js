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
exports.CreateUsuarioDto = void 0;
const class_validator_1 = require("class-validator");
class CreateUsuarioDto {
}
exports.CreateUsuarioDto = CreateUsuarioDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'El primer nombre debe ser un string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El primer nombre es requerido' }),
    (0, class_validator_1.Length)(1, 30, { message: 'El primer nombre no puede tener más de 30 caracteres' }),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "PrimerNombre", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'El segundo nombre debe ser un string' }),
    (0, class_validator_1.IsOptional)({ message: 'El segundo nombre es opcional' }),
    (0, class_validator_1.Length)(1, 30, { message: 'El segundo nombre no puede tener más de 30 caracteres' }),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "SegundoNombre", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'El primer apellido debe ser un string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El primer apellido es requerido' }),
    (0, class_validator_1.Length)(1, 30, { message: 'El primer apellido no puede tener más de 30 caracteres' }),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "PrimerApellido", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'El segundo apellido debe ser un string' }),
    (0, class_validator_1.IsOptional)({ message: 'El segundo apellido es opcional' }),
    (0, class_validator_1.Length)(1, 30, { message: 'El segundo apellido no puede tener más de 30 caracteres' }),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "SegundoApellido", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'El nombre de usuario debe ser un string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El nombre de usuario es requerido' }),
    (0, class_validator_1.Length)(1, 100, { message: 'El nombre de usuario no puede tener más de 100 caracteres' }),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "NombreUsuario", void 0);
__decorate([
    (0, class_validator_1.IsInt)({ message: 'El rol debe ser un número' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El rol es requerido' }),
    __metadata("design:type", Number)
], CreateUsuarioDto.prototype, "rolId", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'La clave debe ser un string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La clave es requerida' }),
    (0, class_validator_1.Length)(6, 100, { message: 'La clave debe tener al menos 6 caracteres' }),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "clave", void 0);
__decorate([
    (0, class_validator_1.IsDate)({ message: 'La fecha de nacimiento no es válida' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La fecha de nacimiento es requerida' }),
    __metadata("design:type", Date)
], CreateUsuarioDto.prototype, "a\u00F1oNace", void 0);
__decorate([
    (0, class_validator_1.IsInt)({ message: 'El género debe ser un número' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El género es requerido' }),
    __metadata("design:type", Number)
], CreateUsuarioDto.prototype, "genero", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El número de cédula es requerido' }),
    (0, class_validator_1.Length)(1, 11, { message: 'El número de cédula no puede tener más de 11 caracteres' }),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "celular", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'El correo electrónico no es válido' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El correo electrónico es requerido' }),
    (0, class_validator_1.Length)(1, 30, { message: 'El correo electrónico no puede tener más de 30 caracteres' }),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "correo", void 0);
//# sourceMappingURL=create-usuario.dto.js.map