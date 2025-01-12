import { Module } from '@nestjs/common';
import { RolesModuleService } from './roles-module.service';

@Module({
  providers: [RolesModuleService],
  exports: [RolesModuleService],
})
export class RolesModuleModule {}
