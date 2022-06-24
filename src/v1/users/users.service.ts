import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import { PasswordService } from '../../utils/password.service';
import { ExceptionsResponse } from './exceptions/exceptions.response';
import { CreateAdminDto } from './dto/create-admin.dto';
import { ResponseService } from 'src/utils/response.service';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private passwordService: PasswordService,
    private res: ResponseService,
  ) {}

  async createAdmin(createAdminDto: CreateAdminDto) {
    const existedAdmin = await this.findAdminByEmail(createAdminDto.email);
    if (existedAdmin) {
      throw new BadRequestException(ExceptionsResponse.adminExisted);
    }

    createAdminDto.password = await this.passwordService.hashPassword(
      createAdminDto.password,
    );

    const user = this.usersRepository.create(createAdminDto);
    user.role = UserRole.Admin;
    const result = await this.usersRepository.save(user);
    return this.res.success(result);
  }

  async findAdminByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: {
        email,
        role: UserRole.Admin,
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
