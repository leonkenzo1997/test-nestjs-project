import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ErrorResponse } from '../exceptions/exceptions.response';

@Injectable()
export class JwtRefreshTokenGuard extends AuthGuard('jwt-refresh') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
  handleRequest(err, user, info) {
    if (err || !user) {
      throw new UnauthorizedException(ErrorResponse.sessionExpired);
    }
    return user;
  }
}
