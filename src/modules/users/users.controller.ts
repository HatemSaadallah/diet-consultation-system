import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { Users } from './users.model';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserInterface } from './objects/user.object';
import { QuestionsService } from '../questions/questions.service';
import { GetQuestionsDto } from '../questions/dto/get-questions.dto';
import { AnswerDto } from '../answers/dto/answer.dto';
import { AnswersService } from '../answers/answers.service';
import { UserInfo } from 'src/common/decorators/user.decorator';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly questionsService: QuestionsService,
    private readonly answerService: AnswersService,
  ) { }

  @Public()
  @Post('signup')
  create(@Body() createUserDto: CreateUserDto) {
    
    return this.userService.signup(createUserDto);
  }
  @Public()
  @Post('login')
  async login(@Body() loginInfo: LoginUserDto): Promise<UserInterface> {
    return this.userService.login(loginInfo);
  }
  @Get('questions')
  async getQuestions(@Body() options: GetQuestionsDto) {
    return this.questionsService.getQuestions(options);
  }

  @Post('answer/:id')
  answerQuestion(@UserInfo() userInfo: Users, @Param('id') id: string, @Body() answerBody: AnswerDto) {
   
    return this.answerService.answerQuestion(+id, answerBody, userInfo);
  }

  @Post('create-draft/:id')
  createDraft(@Param('id') id, @UserInfo() userInfo: Users, @Body() draftBody: AnswerDto) {
    
    return this.answerService.createDraft(+id, userInfo, draftBody);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('/question/:id')
  findOne(@Param('id') id: string) {
    return this.answerService.getAnswersForQuestion(+id);
  }
  // TODO: Implement get drafts feature
  @Get('/drafts')
  getDrafts(@UserInfo() userInfo: Users) {
    
    return this.answerService.getDrafts(userInfo);
  }

  @Delete('answer/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
