import { Module } from '@nestjs/common';

import { QuestionsService } from '../questions/questions.service';
@Module({
  imports: [],
  controllers: [],
  providers: [QuestionsService],
  exports: [QuestionsService],
})
export class QuestionsModule {}
