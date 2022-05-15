import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';

@Module({
  imports: [],
  controllers: [],
  providers: [AnswersService],
})
export class AnswerModule {}
