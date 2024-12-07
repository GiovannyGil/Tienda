// src/common/guards/permissions.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredPermissions = this.reflector.get<string[]>('permissions', context.getHandler());
        if (!requiredPermissions) return true;

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        // Verificar si el usuario y su rol están definidos
        if (!user || !user.rol || !user.rol.nombreRol) {
            console.error('El usuario o su rol no están definidos');
            return false;
        }

        // Obtener permisos basados en el rol
        const userPermissions = this.getPermissionsForRole(user.rol.nombreRol);

        return requiredPermissions.every((permiso) => userPermissions.includes(permiso));
    }

    getPermissionsForRole(role: string): string[] {
        const permissionsMap = {
            Administrador: ['ver', 'agregar', 'editar', 'eliminar'],
            empleado: ['ver'],
        };

        return permissionsMap[role] || [];
    }
}
