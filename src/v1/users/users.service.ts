import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseService } from 'src/utils/response.service';
import { Repository } from 'typeorm';
import { PasswordService } from '../../utils/password.service';
import { RolesService } from '../roles/roles.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { User, UserRole } from './entities/user.entity';
import { ExceptionsResponse } from './exceptions/exceptions.response';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private passwordService: PasswordService,
    private res: ResponseService,
    private roleService: RolesService,
  ) {}

  async createAdmin(createAdminDto: CreateAdminDto) {
    const existedAdmin = await this.findAdminByEmail(createAdminDto.email);
    if (existedAdmin) {
      throw new BadRequestException(ExceptionsResponse.adminExisted);
    }

    createAdminDto.password = await this.passwordService.hashPassword(
      createAdminDto.password,
    );

    const user: any = this.usersRepository.create(createAdminDto);
    user.role = { name: UserRole.Admin };
    const result = await this.usersRepository.save(user);
    return this.res.success(result);
  }

  async findAdminByEmail(email: string): Promise<User> {
    const roleAdmin: any = await this.roleService.findAdminRole();

    return await this.usersRepository.findOne({
      where: {
        email,
        role: { id: roleAdmin?.id },
      },
    });
  }

  // async findOneOrFail(
  //   findConditions: FindConditions<User>,
  //   options?: FindOneOptions<User>,
  // ): Promise<User> {
  //   const user = await this.usersRepository.findOne(findConditions, options);

  //   if (!user) {
  //     throw new UnprocessableEntityException(ExceptionsResponse.userNotFound);
  //   }

  //   return user;
  // }

  // async update(id: number, updateUserDto: UpdateUserDto) {
  //   const user = await this.findOneOrFail({ id });
  //   return await this.usersRepository.save(user);
  // }
}
