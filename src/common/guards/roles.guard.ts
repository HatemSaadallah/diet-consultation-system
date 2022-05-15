import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE } from '../constants/system.constants';
import { ERRORS } from '../utils';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<string[]>(ROLE, context.getHandler());
    if (!roles) {
      return true;
    }

    const request = await context.switchToHttp().getRequest();
    const user = await request.user;
    if (user && roles.includes(user.role)) {
      return true;
    }
    // Throw Unauthorized error
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: ERRORS.USER_NOT_AUTHORIZED,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
