import {
  Controller,
  Post,
  Body,
  Get,
  Logger,
  Param,
  Delete,
} from '@nestjs/common';
import { SQSService } from './sqs.service';

@Controller('sqs')
export class SQSController {
  constructor(private readonly sqsService: SQSService) {}
  @Post('create-queue')
  createQueue(@Body() body) {
    Logger.log(`Creating queue ${body.queueName}`);
    return this.sqsService.createQueue(body.queueName);
  }

  @Get('list-queues')
  listQueues() {
    Logger.log('Listing queues');
    return this.sqsService.listQueues();
  }

  @Get('receive-message')
  receiveMessage() {
    Logger.log(`Receiving message from queue`);
    return this.sqsService.receiveMessage();
  }

  @Delete('delete-message')
  deleteMessage(@Body() message) {
    Logger.log(`Deleting message ${message}`);
    return this.sqsService.deleteMessage(message);
  }
}
