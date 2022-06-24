import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionRule, Rule } from '../../rules/entities/rule.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

@Injectable()
export class RolesGuard implements CanActivate {
  protected version = 'v1';
  protected allRule = 'all';

  constructor(
    private reflector: Reflector,
    @InjectRepository(Rule)
    private readonly ruleRepository: Repository<Rule>,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const controllerName = context.getClass().name;
    const actionName = context.getHandler().name;

    const requiredRule = `${this.version}|${controllerName}|${actionName}`;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const rule = await this.ruleRepository.findOne({
      where: {
        role: { id: user.roleId },
        resource: In([requiredRule, this.allRule]),
      },
    });

    return rule?.permission === PermissionRule.ALLOW;
  }
}
