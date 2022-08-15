import { GetRoleDTO } from './dto/get-all-role.dto';
import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseService } from 'src/utils/response.service';
import { Like, Repository } from 'typeorm';
import { PaginateService } from './../../utils/paginate.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role, RoleName } from './entities/role.entity';
import { ErrorResponse } from './exceptions/exceptions.response';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
    private res: ResponseService,
    private paginate: PaginateService,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const role: any = this.rolesRepository.create(createRoleDto);
    await this.rolesRepository.save(role);
    return this.res.success(role);
  }

  async findAll(getRoleDTO: GetRoleDTO) {
    const page = getRoleDTO.page ? getRoleDTO.page : 1;
    const limit = getRoleDTO.limit ? getRoleDTO.limit : 10;
    const order = getRoleDTO.order;
    const keyword = getRoleDTO.keyword;
    const skip = (page - 1) * limit;
    let conditions = {};

    if (getRoleDTO.keyword) {
      conditions['name'] = Like(`%${keyword}%`);
    }
    const [roles, total] = await this.rolesRepository.findAndCount({
      where: conditions,
      order: { createdAt: order },
      take: limit,
      skip: skip,
    });
    const result = this.paginate.create(roles, total, page, limit);
    return this.res.success(result);
  }

  async findAdminRole(): Promise<Role> {
    const role = await this.rolesRepository.findOne({
      where: { name: RoleName.admin },
    });

    if (!role) {
      throw new BadRequestException(ErrorResponse.adminRoleNotFound);
    }

    return role;
  }

  public async findOneByID(id: number) {
    const role = await this.rolesRepository.findOne({ where: { id } });

    if (!role) {
      throw new UnprocessableEntityException(ErrorResponse.roleNotFound);
    }

    return role;
  }

  public async getDetail(id: number) {
    const role = await this.rolesRepository.findOne({ where: { id } });

    if (!role) {
      throw new UnprocessableEntityException(ErrorResponse.roleNotFound);
    }

    return this.res.success(role);
  }

  public async update(id: number, updateRoleDto: UpdateRoleDto) {
    await this.findOneByID(id);
    let dataUpdate = {
      id: id,
      ...updateRoleDto,
    };
    const role = await this.rolesRepository.save(dataUpdate);
    return this.res.success(role);
  }
}
