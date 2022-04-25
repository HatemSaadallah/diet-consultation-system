import { Users } from './users.model';

import { REPOSITORIES } from 'src/common/constants';

export const UserProvider = [
  {
    provide: REPOSITORIES.CONSULTANT_REPOSITORY,
    useValue: Users,
  },
];
