import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { RolesService } from '../roles.service';

@Injectable()
export class RolesTaskService {
    constructor(private readonly rolesService: RolesService) { }

    // Ejecutar el proceso diariamente a las 12:00 AM
    @Cron('0 0 * * *')
    async handlePurgeDeletedRoles() {
        console.log('Ejecutando purga de roles eliminados...');
        await this.rolesService.remove();
    }
}
