import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<string[]>('type', context.getHandler());
    // console.log(1111111, roles);
    if (!roles) {
      return true;
    }

    const request = await context.switchToHttp().getRequest();
    // console.log(222222, request.user);

    const user = await request.user;
    return user && roles.includes(user.role);
  }
}
