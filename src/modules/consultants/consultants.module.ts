import { CacheModule, Module } from '@nestjs/common';
import { ConsultantsService } from './consultants.service';
import { ConsultantsController } from './consultants.controller';
import { ConsultantProvider } from './consultants.provider';
import { QuestionsProvider } from '../questions/questions.provider';
import { AnswersProvider } from '../answers/answers.provider';

import { QuestionsService } from '../questions/questions.service';
import { AnswersService } from '../answers/answers.service';
@Module({
  imports: [
    CacheModule.register(),
  ],
  controllers: [ConsultantsController],
  providers: [ConsultantsService, QuestionsService, AnswersService, ...ConsultantProvider, ...QuestionsProvider, ...AnswersProvider],
})
export class ConsultantsModule {}
