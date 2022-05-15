import { SetMetadata } from '@nestjs/common';
import { ROLE } from '../constants/system.constants';
export const Roles = (...roles: string[]) => SetMetadata(ROLE, roles);
