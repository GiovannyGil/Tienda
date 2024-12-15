import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

// Constante que define el metadata personalizado
export const ROLES_KEY = 'roles';

// Injectable del guard
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
  
      if (!requiredRoles) {
        // Si no hay roles definidos, se permite el acceso
        return true;
      }
  
      const request = context.switchToHttp().getRequest();
      const user = request.user;
  
      // Validar que el usuario tiene los roles requeridos
      const hasRole = requiredRoles.some((role) => user.roles?.includes(role));
  
      if (!hasRole) {
        throw new ForbiddenException('No tienes permisos para realizar esta acción.');
      }
  
      return hasRole;
    } catch (error) {
      throw new ForbiddenException('Algo salió mal o No tienes permisos para realizar esta acción.')
    }
  }
}
