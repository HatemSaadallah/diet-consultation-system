import { Controller, Post, Body, Get, Logger } from '@nestjs/common';
import { UserInfo } from 'src/common/decorators/user.decorator';
import { UserInfoDto } from 'src/common/dto/user-info.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { GetQuestionsDto } from './dto/get-questions.dto';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}
  // Define Logger
  private readonly logger = new Logger('QuestionsController');
  @Get('')
  getQuestions(@Body() options: GetQuestionsDto) {
    return this.questionsService.getQuestions(options);
  }

  @Post('create')
  create(
    @Body() createQuestionDto: CreateQuestionDto,
    @UserInfo() userInfo: UserInfoDto,
  ): Promise<CreateQuestionDto> {
    return this.questionsService.createQuestion(createQuestionDto, userInfo);
  }
}
