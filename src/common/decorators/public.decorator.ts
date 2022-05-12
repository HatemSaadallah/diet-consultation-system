import { SetMetadata } from '@nestjs/common';
import { ROLES_TYPES } from '../constants';

export const Public = () => SetMetadata(ROLES_TYPES.PUBLIC, true);
