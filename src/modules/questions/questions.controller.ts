import { Controller, Post, Body, Get, Param, Inject } from '@nestjs/common';
import { UserInfo } from 'src/common/decorators/user.decorator';
import { Users } from '../users/users.model';
import { CreateQuestionDto } from './dto/create-question.dto';
import { GetQuestionsDto } from './dto/get-questions.dto';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get('')
  getQuestions(@Body() options: GetQuestionsDto) {
    return this.questionsService.getQuestions(options);
  }

  @Post('create')
  create(
    @Body() createQuestionDto: CreateQuestionDto,
    @UserInfo() userInfo: Users,
  ): Promise<CreateQuestionDto> {
    return this.questionsService.createQuestion(createQuestionDto, userInfo);
  }
}
