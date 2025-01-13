import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto';
import { Role } from './entities';
export declare class RolesModuleService {
    private readonly roleRepository;
    private readonly logger;
    constructor(roleRepository: Repository<Role>);
    create(createRoleDto: CreateRoleDto): Promise<Role>;
    private handleDBExceptions;
}
