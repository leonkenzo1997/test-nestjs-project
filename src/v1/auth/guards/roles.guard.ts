import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../users/entities/user.entity';
import { ErrorResponse } from '../exceptions/exceptions.response';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<number[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const user = request.user;

    if (!user) {
      throw new UnauthorizedException(ErrorResponse.unauthorized);
    }

    if (roles.includes(UserRole.Any)) {
      return true;
    }

    const isAuthorized = roles.includes(user.role);

    if (!isAuthorized) {
      throw new ForbiddenException(ErrorResponse.forbidden);
    }

    return true;
  }
}
