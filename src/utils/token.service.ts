import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserRole } from 'src/v1/users/entities/user.entity';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    // empty
  }

  generateAccessToken(userId: number, sessionId: number, role: UserRole) {
    const options = {
      expiresIn: this.configService.get<string>('jwt.accessTokenExpiresIn'),
      secret: this.configService.get<string>('jwt.accessTokenSecret'),
    };

    return this.jwtService.sign({ userId, sessionId, role }, options);
  }

  generateRefreshToken(userId: number, sessionId: number, role: UserRole) {
    const options = {
      secret: this.configService.get<string>('jwt.refreshTokenSecret'),
    };

    return this.jwtService.sign({ userId, sessionId, role }, options);
  }
}
