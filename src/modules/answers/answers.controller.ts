import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { Roles } from 'src/common/decorators';
import { UserInfo } from 'src/common/decorators/user.decorator';
import { Users } from '../users/users.model';
import { AnswersService } from './answers.service';
import { AnswerDto } from './dto/answer.dto';

@Controller('answers')
export class AnswersController {
  constructor(
    @Inject(AnswersService)
    private readonly answerService: AnswersService,
  ) {}

  @Post('/:id')
  @Roles('consultant')
  answerQuestion(
    @UserInfo() userInfo: Users,
    @Param('id') id: string,
    @Body() answerBody: AnswerDto,
  ) {
    return this.answerService.answerQuestion(+id, answerBody, userInfo);
  }
  @Roles('consultant')
  @Post('create-draft/:id')
  createDraft(
    @Param('id') id,
    @UserInfo() userInfo: Users,
    @Body() draftBody: AnswerDto,
  ) {
    return this.answerService.createDraft(+id, userInfo, draftBody);
  }
  @Get('/question/:id')
  @Roles('consultant')
  findOne(@Param('id') id: string) {
    return this.answerService.getAnswersForQuestion(+id);
  }

  @Get('/drafts')
  @Roles('consultant')
  getDrafts(@UserInfo() userInfo: Users) {
    return this.answerService.getDrafts(userInfo);
  }
}
