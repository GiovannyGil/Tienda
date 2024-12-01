import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/roles/entities/role.entity';
export declare class UsuariosService {
    private usuarioRepository;
    private roleRepository;
    constructor(usuarioRepository: Repository<Usuario>, roleRepository: Repository<Role>);
    create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario>;
    findAll(): Promise<Usuario[]>;
    findOneByID(id: number): Promise<Usuario>;
    findOneByNombreUsuario(nombreUsuario: string): Promise<Usuario>;
    findOneByCorreo(correo: string): Promise<Usuario>;
    update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario>;
    softDelete(id: number): Promise<string>;
}
