import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(nombreUsuario: string, clave: string): Promise<any> {
    const usuario = await this.usuariosService.findOneByNombreUsuario(nombreUsuario);

    // Verifica si el usuario existe
    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Verifica si las contraseñas coinciden
    const isPasswordMatching = await bcrypt.compare(clave, usuario.clave);

    if (!isPasswordMatching) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Si todo es correcto, retorna el usuario
    return usuario;
  }


  async login(nombreUsuario: string, clave: string): Promise<{ accessToken: string }> {
    const usuario = await this.validateUser(nombreUsuario, clave);
    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { sub: usuario.id, nombreUsuario: usuario.NombreUsuario, rol: usuario.rol?.nombre };
    const token = this.jwtService.sign(payload);

    return { accessToken: token };
  }

  async logout(): Promise<{ message: string }> {
    // Este método es funcional pero puede extenderse con una blacklist de tokens
    return { message: 'Logout exitoso' };
  }
}
