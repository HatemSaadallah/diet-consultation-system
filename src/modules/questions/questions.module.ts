import { Module } from '@nestjs/common';

import { QuestionsService } from '../questions/questions.service';
import { QuestionsController } from './questions.controller';
import { QuestionsProvider } from './questions.provider';
@Module({
  imports: [],
  controllers: [QuestionsController],
  providers: [QuestionsService, ...QuestionsProvider],
  exports: [QuestionsService],
})
export class QuestionsModule {}
