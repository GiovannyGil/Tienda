import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() createAuthDto: CreateAuthDto) {
    const { nombreUsuario, clave } = createAuthDto;
    return this.authService.login(nombreUsuario, clave);
  }

  @Post('logout')
  async logout() {
    return this.authService.logout();
  }
}
