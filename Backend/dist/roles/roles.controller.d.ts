import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    create(createRoleDto: CreateRoleDto): Promise<import("./entities/role.entity").Role>;
    findAll(): Promise<import("./entities/role.entity").Role[]>;
    findOneByID(id: string): Promise<import("./entities/role.entity").Role>;
    findOneByNombre(nombreRol: string): Promise<import("./entities/role.entity").Role>;
    update(id: string, updateRoleDto: UpdateRoleDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<string>;
    cleanDeletedRecords(): Promise<void>;
}
