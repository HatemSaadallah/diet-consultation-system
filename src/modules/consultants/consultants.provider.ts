import { Consultants } from './consultants.model';

import { REPOSITORIES } from 'src/common/constants';

export const ConsultantProvider = [
  {
    provide: REPOSITORIES.CONSULTANT_REPOSITORY,
    useValue: Consultants,
  },
];
