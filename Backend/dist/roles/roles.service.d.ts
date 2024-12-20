import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
export declare class RolesService {
    private roleRepository;
    constructor(roleRepository: Repository<Role>);
    verifyExistROL(nombreRol: string): Promise<Boolean>;
    create(createRoleDto: CreateRoleDto): Promise<Role>;
    findAll(): Promise<Role[]>;
    findOneByID(id: number): Promise<Role>;
    findOneByNombre(nombreRol: string): Promise<Role>;
    update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role>;
    softDelete(id: number): Promise<string>;
    cleanDeletedRecords(): Promise<void>;
}
