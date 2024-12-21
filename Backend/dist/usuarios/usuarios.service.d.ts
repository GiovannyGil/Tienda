import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { UpdateClaveDto } from './dto/update-clave.dto';
import { JwtService } from '@nestjs/jwt';
export declare class UsuariosService {
    private usuarioRepository;
    private roleRepository;
    private jwtService;
    constructor(usuarioRepository: Repository<Usuario>, roleRepository: Repository<Role>, jwtService: JwtService);
    create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario>;
    findAll(): Promise<Usuario[]>;
    findOneByID(id: number): Promise<Usuario>;
    findOneByNombreUsuario(nombreUsuario: string): Promise<Usuario | null>;
    findOneByCorreo(correo: string): Promise<Usuario>;
    update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario>;
    updatePassword(id: number, updateClaveDto: UpdateClaveDto): Promise<string>;
    softDelete(id: number): Promise<string>;
    cleanDeletedRecords(): Promise<void>;
}
