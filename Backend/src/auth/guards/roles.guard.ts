import { 
  CanActivate, 
  ExecutionContext, 
  Injectable, 
  UnauthorizedException,
  ForbiddenException 
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from 'src/usuarios/usuarios.service';

export const ROLES_KEY = 'roles';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private usuariosService: UsuariosService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);
  
    console.log('Roles requeridos auth:', requiredRoles);
  
    // Si no hay roles específicos, permitir acceso
    if (!requiredRoles) {
      return true;
    }
  
    const request = context.switchToHttp().getRequest();
    
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token no proporcionado');
    }
  
    const token = authHeader.split(' ')[1];
  
    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET
      });
  
      console.log('Token completo decodificado:', decoded);
  
      // Obtener información del usuario para depurar
      const usuario = await this.usuariosService.findOneByID(decoded.sub);
      
      console.log('Usuario encontrado:', usuario);
      console.log('Rol del usuario:', usuario?.rol.nombreRol);
  
      // Si no hay usuario o no tiene rol, lanzar excepción
      if (!usuario || !usuario.rol) {
        throw new UnauthorizedException('Usuario sin rol asignado');
      }
  
      // Pasar el rol del usuario al token
      decoded.rol = usuario.rol.nombreRol;
  
      // Establecer el usuario en el request
      request.user = {
        id: decoded.sub,
        nombreUsuario: decoded.nombreUsuario,
        rol: decoded.rol
      };
  
      // Verificar roles
      const tienePermiso = requiredRoles.some(
        (rol) => rol.toLowerCase() === decoded.rol.toLowerCase()
      );
  
      if (!tienePermiso) {
        console.log('Rol actual:', decoded.rol);
        console.log('Roles requeridos:', requiredRoles);
        throw new ForbiddenException('No tienes permisos suficientes');
      }
  
      return true;
    } catch (error) {
      throw new UnauthorizedException('Usuario no Autorizado auth');
    }
  }
}