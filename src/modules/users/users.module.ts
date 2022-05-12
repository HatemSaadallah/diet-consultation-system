import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { UserProvider } from './users.provider';
import { QuestionsProvider } from '../questions/questions.provider';
import { AnswersProvider } from '../answers/answers.provider';

import { AnswersService } from '../answers/answers.service';
import { CustomLogger } from 'src/common/logger/winston.logger';
import { QuestionsModule } from '../questions/questions.module';
@Module({
  imports: [QuestionsModule],
  controllers: [UserController],
  providers: [
    UserService,
    AnswersService,
    CustomLogger,
    ...UserProvider,
    ...QuestionsProvider,
    ...AnswersProvider,
  ],
  exports: [UserService],
})
export class UsersModule {}
