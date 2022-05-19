import { Module } from '@nestjs/common';
import { SQSController } from './sqs.controller';
import { SQSService } from './sqs.service';

@Module({
  imports: [],
  controllers: [SQSController],
  providers: [SQSService],
  exports: [],
})
export class SQSModule {}
