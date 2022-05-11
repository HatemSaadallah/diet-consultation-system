import { Module } from '@nestjs/common';
import { CustomLogger } from 'src/common/logger/winston.logger';

@Module({
  imports: [],
  controllers: [],
  providers: [CustomLogger],
})
export class AnswerModule {}
