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
    if (!usuario) { throw new UnauthorizedException('Usuario Inválido'); }

    const isPasswordValid = await bcrypt.compare(clave, usuario.clave);
    if (!isPasswordValid) { throw new UnauthorizedException('Clave inválida'); }

    const payload = { sub: usuario.id, nombreUsuario: usuario.NombreUsuario, clave: usuario.clave };
    const token = await this.jwtService.signAsync(payload);
    return { access_token: token };
  }

  // Método para invalidar un token
  logout(token: string): void {
    this.invalidatedTokens.add(token); // Agregar el token a la lista negra
  }

  // Validar si el token está en la lista negra
  isTokenInvalidated(token: string): boolean {
    return this.invalidatedTokens.has(token);
  }

}
