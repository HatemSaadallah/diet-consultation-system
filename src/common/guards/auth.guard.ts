import { CACHE_MANAGER, CanActivate, ExecutionContext, Inject, Injectable, Logger } from "@nestjs/common";
import { verifyToken } from "../utils/jwt";
import { Reflector } from "@nestjs/core";
import { Cache } from 'cache-manager';
import { Consultants } from "src/modules/consultants/consultants.model";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
    @Inject(CACHE_MANAGER) 
    private cacheManager: Cache
    ) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const isPublic = this.reflector.get<string[]>(
      'public',
      context.getHandler(),
    );
    if (isPublic) {
      return true;
    }
    const user: Consultants = await this.cacheManager.get('consultant');
    const token = await this.cacheManager.get('token');

    if(!user || !token) {
      return false;
    }
    
    const decoded = verifyToken(token, this.configService.get('JWTKEY') || 'secret');

    if(!decoded) return false;

    return decoded.username == user.username;
  }
}