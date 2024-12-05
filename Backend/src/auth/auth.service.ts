import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  // Definir la propiedad invalidatedTokens como un conjunto (Set) de strings
  private invalidatedTokens: Set<string> = new Set(); // Lista negra de tokens

  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) { }

  async login(nombreUsuario: string, clave: string): Promise<{ access_token: string }> {
    const usuario = await this.usuariosService.findOneByNombreUsuario(nombreUsuario);
    if (!usuario) {
      throw new UnauthorizedException('Usuario Inválido');
    }

    const isPasswordValid = await bcrypt.compare(clave, usuario.clave);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Clave inválida');
    }

    const payload = { nombreUsuario: usuario.NombreUsuario, sub: usuario.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async logout(token: string): Promise<{ message: string }> {
    // Añadir el token a la lista negra
    this.invalidatedTokens.add(token);
    return { message: 'Sesión cerrada exitosamente' };
  }

  isTokenInvalidated(token: string): boolean {
    // Verificar si el token está en la lista negra
    return this.invalidatedTokens.has(token);
  }

}
