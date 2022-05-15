import { Users } from './users.model';

import { REPOSITORIES } from 'src/common/constants';

export const UserProvider = [
  {
    provide: REPOSITORIES.USER_REPOSITORY,
    // useValue: Users,
    // Get value of users using useFactory
    useFactory: () => {
      return Users;
    },
  },
];
