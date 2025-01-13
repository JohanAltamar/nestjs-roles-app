import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RolesModuleService } from './roles-module.service';

import { Role } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RolesModuleService],
  exports: [RolesModuleService],
})
export class RolesModuleModule {}
