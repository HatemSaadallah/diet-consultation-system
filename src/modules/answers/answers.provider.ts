import { Answers } from './answers.model';

import { REPOSITORIES } from 'src/common/constants';

export const AnswersProvider = [
  {
    provide: REPOSITORIES.ANSWER_REPOSITORY,
    useFactory: () => {
      return Answers;
    },
  },
];
