import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { verifyToken } from '../utils/jwt';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/modules/users/users.service';
import { ROLES_TYPES } from '../constants';

@Injectable()
export class AuthGuard implements CanActivate {
  private logger = new Logger('AuthGuard');
  constructor(
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,

    private readonly userService: UsersService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<string[]>(
      ROLES_TYPES.PUBLIC,
      context.getHandler(),
    );
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const { token } = request.headers;
    if (!token) {
      return false;
    }

    try {
      const data = verifyToken(token, this.configService.get('JWTKEY'));

      const user = await this.userService.findUserById(data.id);

      request.user = user.get({ plain: true });
    } catch {
      return false;
    }
    return true;
  }
}
