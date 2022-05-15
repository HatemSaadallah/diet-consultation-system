import { Module } from '@nestjs/common';
import { QuestionsModule } from '../questions/questions.module';
import { AnswersProvider } from './answers.provider';
import { AnswersService } from './answers.service';

@Module({
  imports: [QuestionsModule],
  controllers: [],
  providers: [AnswersService, ...AnswersProvider],
  exports: [],
})
export class AnswerModule {}
