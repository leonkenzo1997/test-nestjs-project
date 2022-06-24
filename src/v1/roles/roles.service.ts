import {
  BadRequestException,
  HttpException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role, RoleName } from './entities/role.entity';
import { ErrorResponse } from './exceptions/exceptions.response';
import { ResponseService } from 'src/utils/response.service';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
    private res: ResponseService,
  ) {}

  async findAdminRole(): Promise<Role> {
    const role = await this.rolesRepository.findOne({
      where: { name: RoleName.admin },
    });

    if (!role) {
      throw new BadRequestException(ErrorResponse.AdminRoleNotFound);
    }

    return role;
  }

  // public async findOneOrFail(options: FindConditions<Role>): Promise<Role> {
  //   const role = await this.rolesRepository.findOne(options);

  //   if (!role) {
  //     throw new UnprocessableEntityException(ExceptionsResponse.roleNotFound);
  //   }

  //   return role;
  // }

  // public async update(id: number, updateRoleDto: UpdateRoleDto) {
  //   const role = await this.findOneOrFail({ id });
  //   return await role.save();
  // }
}
