import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { UserProvider } from './users.provider';
import { QuestionsProvider } from '../questions/questions.provider';
import { AnswersProvider } from '../answers/answers.provider';

import { QuestionsService } from '../questions/questions.service';
import { AnswersService } from '../answers/answers.service';
@Module({
  controllers: [ UserController ],
  providers: [UserService, QuestionsService, AnswersService, ...UserProvider, ...QuestionsProvider, ...AnswersProvider],
})
export class UsersModule {}
