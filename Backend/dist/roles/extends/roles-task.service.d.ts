import { RolesService } from '../roles.service';
export declare class RolesTaskService {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    handlePurgeDeletedRoles(): Promise<void>;
}
