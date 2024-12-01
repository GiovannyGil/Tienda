import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role } from './entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesTaskService } from './complements/roles-task.service';
import { PermisosModule } from 'src/permisos/permisos.module';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), PermisosModule],
  controllers: [RolesController],
  providers: [RolesService, RolesTaskService],
  exports: [RolesService, TypeOrmModule]
})
export class RolesModule { }
