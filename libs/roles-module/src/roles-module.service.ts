import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateRoleDto } from './dto';

import { Role } from './entities';

@Injectable()
export class RolesModuleService {
  private readonly logger = new Logger('RoleService');

  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    // private readonly permissionsService: PermissionsService,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const { permissions = [], ...roleDetails } = createRoleDto;

    console.log({ permissions }); // TODO: remove this

    // const existingPermissions = await Promise.all(
    //   permissions.map((permission) =>
    //     this.permissionsService.findOne(permission),
    //   ),
    // );

    const newRole = this.roleRepository.create({
      ...roleDetails,
      // permissions: existingPermissions,
    });

    try {
      await this.roleRepository.save(newRole);

      return newRole;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  private handleDBExceptions = (error) => {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  };
}
