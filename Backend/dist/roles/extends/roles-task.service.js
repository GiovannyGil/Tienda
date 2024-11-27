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
exports.RolesTaskService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const roles_service_1 = require("../roles.service");
let RolesTaskService = class RolesTaskService {
    constructor(rolesService) {
        this.rolesService = rolesService;
    }
    async handlePurgeDeletedRoles() {
        console.log('Ejecutando purga de roles eliminados...');
        await this.rolesService.remove();
    }
};
exports.RolesTaskService = RolesTaskService;
__decorate([
    (0, schedule_1.Cron)('0 0 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RolesTaskService.prototype, "handlePurgeDeletedRoles", null);
exports.RolesTaskService = RolesTaskService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [roles_service_1.RolesService])
], RolesTaskService);
//# sourceMappingURL=roles-task.service.js.map