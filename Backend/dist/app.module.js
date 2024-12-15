"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const conexion_1 = require("./database/conexion");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./auth/auth.module");
const roles_module_1 = require("./roles/roles.module");
const usuarios_module_1 = require("./usuarios/usuarios.module");
const schedule_1 = require("@nestjs/schedule");
const permisos_module_1 = require("./permisos/permisos.module");
const productos_module_1 = require("./productos/productos.module");
const ventas_module_1 = require("./ventas/ventas.module");
const compras_module_1 = require("./compras/compras.module");
const categorias_module_1 = require("./categorias/categorias.module");
const proveedores_module_1 = require("./proveedores/proveedores.module");
const core_1 = require("@nestjs/core");
const roles_guard_1 = require("./auth/guards/roles.guard");
const dashboard_module_1 = require("./dashboard/dashboard.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(conexion_1.default),
            schedule_1.ScheduleModule.forRoot(),
            auth_module_1.AuthModule, roles_module_1.RolesModule, usuarios_module_1.UsuariosModule, permisos_module_1.PermisosModule, productos_module_1.ProductosModule, ventas_module_1.VentasModule, compras_module_1.ComprasModule, categorias_module_1.CategoriasModule, proveedores_module_1.ProveedoresModule, dashboard_module_1.DashboardModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [{
                provide: core_1.APP_GUARD,
                useClass: roles_guard_1.RolesGuard,
            },
            app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map