import { Questions } from './questions.model';
import { REPOSITORIES } from 'src/common/constants';

export const QuestionsProvider = [
  {
    provide: REPOSITORIES.QUESTION_REPOSITORIES,
    useValue: Questions,
  },
];
