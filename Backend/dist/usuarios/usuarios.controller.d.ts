import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UpdateClaveDto } from './dto/update-clave.dto';
export declare class UsuariosController {
    private readonly usuariosService;
    constructor(usuariosService: UsuariosService);
    create(createUsuarioDto: CreateUsuarioDto): Promise<import("./entities/usuario.entity").Usuario>;
    findAll(): Promise<import("./entities/usuario.entity").Usuario[]>;
    findOneByID(id: string): Promise<import("./entities/usuario.entity").Usuario>;
    findOneByNombreUsuario(NombreUsuario: string): Promise<import("./entities/usuario.entity").Usuario>;
    findOneByCorreo(correo: string): Promise<import("./entities/usuario.entity").Usuario>;
    update(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<import("./entities/usuario.entity").Usuario>;
    updatePassword(id: string, updateClaveDto: UpdateClaveDto): Promise<string>;
    remove(id: string): Promise<string>;
    cleanDeletedRecords(): Promise<void>;
}
