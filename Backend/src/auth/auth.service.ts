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

  async validateUser(nombreUsuario: string, clave: string): Promise<Usuario | null> {
    const usuario = await this.usuariosService.findOneByNombreUsuario(nombreUsuario);

    if (usuario && (await bcrypt.compare(clave, usuario.clave))) {
      return usuario; // Retorna el usuario si las credenciales son correctas
    }
    return null;
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
    // Aquí puedes implementar la invalidación del token si utilizas una blacklist
    return { message: 'Logout exitoso' };
  }
}
