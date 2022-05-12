import { SetMetadata } from '@nestjs/common';
import { ROLES_TYPES } from '../constants';

console.log(1111111111, ROLES_TYPES.PUBLIC);

export const Public = () => SetMetadata(ROLES_TYPES.PUBLIC, true);
