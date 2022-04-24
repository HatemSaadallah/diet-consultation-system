import { CACHE_MANAGER, CanActivate, ExecutionContext, Inject, Injectable, Logger } from "@nestjs/common";
import { verifyToken } from "../utils/jwt";
import { Reflector } from "@nestjs/core";
import { Cache } from 'cache-manager';
import { Consultants } from "src/modules/consultants/consultants.model";
import { ConfigService } from "@nestjs/config";
import { ConsultantsService } from "src/modules/consultants/consultants.service";
import { EXCEPTIONS } from "../utils";
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,

    private readonly consultantService: ConsultantsService,
  ) { }
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

    const request = context.switchToHttp().getRequest();
    
    const { token } = request.headers;
    // console.log(token);
    if (!token) {
      return false;
    }
    

    try {
      const data = verifyToken(token, this.configService.get('JWTKEY'));
      // console.log(data);
      
      const consultant = await this.consultantService.findConsultantById(data.id);
      console.log(consultant.get({ plain: true }) );
      
      request.consultant = consultant.get({ plain: true });
      request.consultant.consultantId = consultant.id;
      // console.log(request.consultant);
      
    } catch {
      return false;
    }
    return true;
  }
}