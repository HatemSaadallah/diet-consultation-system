import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { verifyToken } from '../utils/jwt';
import { Reflector } from '@nestjs/core';
import { Users } from 'src/modules/users/users.model';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/modules/users/users.service';
import { EXCEPTIONS } from '../utils';
@Injectable()
export class AuthGuard implements CanActivate {
  private logger = new Logger('AuthGuard');
  constructor(
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,

    private readonly userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<string[]>(
      'public',
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
      // request.user.userId = user.id;
    } catch {
      // this.logger.error(EXCEPTIONS.UNAUTHORIZED);
      return false;
    }
    return true;
  }
}
