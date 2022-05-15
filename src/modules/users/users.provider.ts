import { Users } from './users.model';

import { REPOSITORIES } from 'src/common/constants';

export const UserProvider = [
  {
    provide: REPOSITORIES.USER_REPOSITORY,
    useFactory: () => {
      return Users;
    },
  },
];
