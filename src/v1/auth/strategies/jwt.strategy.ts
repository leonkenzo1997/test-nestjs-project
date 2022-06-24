import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { SessionsService } from '../../sessions/sessions.service';
import { ResponseService } from 'src/utils/response.service';
import { ErrorResponse } from '../exceptions/exceptions.response';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private sessionsService: SessionsService,
    private res: ResponseService,
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.accessTokenSecret'),
    });
  }

  async validate(token) {
    //Check Redis, if not then check database
    const cache = await this.cacheManager.get(String(token.sessionId));

    if (!cache) {
      const session = await this.sessionsService.findActiveSessionById(
        token.sessionId,
      );

      if (!session) {
        throw new UnauthorizedException(ErrorResponse.sessionExpired);
      }

      await this.cacheManager.set(String(session.id), 1, {
        ttl: 300,
      });
    }

    return {
      id: token.userId,
      sessionId: token.sessionId,
      role: token.role,
    };
  }
}
