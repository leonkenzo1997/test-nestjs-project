import { BadRequestException, Injectable } from '@nestjs/common';
import { PasswordService } from '../../utils/password.service';
import { ResponseService } from '../../utils/response.service';
import { TokenService } from '../../utils/token.service';
import { SessionsService } from '../sessions/sessions.service';
import { UserStatus } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AdminLoginDto } from './dto/admin-login.dto';
import { ErrorResponse } from './exceptions/exceptions.response';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private passwordService: PasswordService,
    private userService: UsersService,
    private sessionService: SessionsService,
    private tokenService: TokenService,
    private res: ResponseService,
  ) {
    // empty
  }

  async adminLogin(adminLoginDto: AdminLoginDto) {
    //Find ANY User
    const user = await this.userService.findAdminByEmail(adminLoginDto.email);

    if (!user) {
      return this.res.success('ACCOUNT_NOT_REGISTERED');
    }
    //Check status and return error if not active

    let err = null;

    switch (user.status) {
      case UserStatus.Pending:
        err = 'ACCOUNT_PENDING';
        break;
      case UserStatus.Blocked:
        err = 'ACCOUNT_BLOCKED';
        break;
      case UserStatus.Deactivated:
        err = 'ACCOUNT_DEACTIVATED';
        break;
    }
    if (err) {
      return this.res.success(err);
    }

    if (user.status != UserStatus.Active && !err) {
      throw new BadRequestException(ErrorResponse.unknownUserStatus);
    }

    //Compare password

    if (
      !this.passwordService.comparePassword(
        adminLoginDto.password,
        user.password,
      )
    ) {
      return this.res.success('WRONG_PASSWORD');
    }

    //Create session

    const session = await this.sessionService.createSession(user);

    //Generate access and refresh token

    const [accessToken, refreshToken] = [
      this.tokenService.generateAccessToken(user.id, session.id, user.role),
      this.tokenService.generateRefreshToken(user.id, session.id, user.role),
    ];

    //return user info and token

    return this.res.success({
      user,
      accessToken,
      refreshToken,
    });
  }

  async accessToken(user) {
    const accessToken = this.tokenService.generateAccessToken(
      user.id,
      user.sessionId,
      user.role,
    );

    return this.res.success({
      accessToken,
    });
  }
}
