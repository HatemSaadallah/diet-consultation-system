import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { Users } from './users.model';
import { UserService } from './users.service';
import { AnswerDto } from '../answers/dto/answer.dto';
import { AnswersService } from '../answers/answers.service';
import { UserInfo } from 'src/common/decorators/user.decorator';
import { Roles } from 'src/common/decorators';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly answerService: AnswersService,
  ) {}

  @Post('answer/:id')
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
  // DONE: Implement get drafts feature
  @Get('/drafts')
  @Roles('consultant')
  getDrafts(@UserInfo() userInfo: Users) {
    return this.answerService.getDrafts(userInfo);
  }

  @Roles('consultant')
  @Delete('answer/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
