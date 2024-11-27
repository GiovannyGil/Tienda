import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PermisosService } from '../permisos.service';

@Injectable()
export class PermisosDeleteService {
    constructor(private readonly permisosService: PermisosService) { }

    // Ejecutar el proceso diariamente a las 12:00 AM
    @Cron('0 0 * * *')
    async handlePurgeDeletedPermisos() {
        console.log('Ejecutando purga de roles eliminados...');
        await this.permisosService.remove();
    }
}
