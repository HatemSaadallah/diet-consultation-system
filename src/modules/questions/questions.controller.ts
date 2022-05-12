import { Controller, Post, Body } from '@nestjs/common';
import { UserInfo } from 'src/common/decorators/user.decorator';
import { Users } from '../users/users.model';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionService: QuestionsService) {}

  @Post('create')
  create(
    @Body() createQuestionDto: CreateQuestionDto,
    @UserInfo() userInfo: Users,
  ): Promise<CreateQuestionDto> {
    return this.questionService.createQuestion(createQuestionDto, userInfo);
  }
}
