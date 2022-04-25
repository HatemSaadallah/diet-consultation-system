import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { Users } from './users.model';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserInterface } from './objects/consultant.object';
import { QuestionsService } from '../questions/questions.service';
import { GetQuestionsDto } from '../questions/dto/get-questions.dto';
import { AnswerDto } from '../answers/dto/answer.dto';
import { AnswersService } from '../answers/answers.service';
import { UserInfo } from 'src/common/decorators/user.decorator';

@Controller('consultants')
export class ConsultantsController {
  constructor(
    private readonly consultantsService: UserService,
    private readonly questionsService: QuestionsService,
    private readonly answerService: AnswersService,
  ) { }

  @Public()
  @Post('signup')
  create(@Body() createConsultantDto: CreateUserDto) {
    
    return this.consultantsService.signup(createConsultantDto);
  }
  @Public()
  @Post('login')
  async login(@Body() loginInfo: LoginUserDto): Promise<UserInterface> {
    return this.consultantsService.login(loginInfo);
  }
  @Get('questions')
  async getQuestions(@Body() options: GetQuestionsDto) {
    return this.questionsService.getQuestions(options);
  }

  @Post('answer/:id')
  answerQuestion(@UserInfo() consultantInfo: Users, @Param('id') id: string, @Body() answerBody: AnswerDto) {
   
    return this.answerService.answerQuestion(+id, answerBody, consultantInfo);
  }

  @Post('create-draft/:id')
  createDraft(@Param('id') id, @UserInfo() consultantInfo: Users, @Body() draftBody: AnswerDto) {

    // questionId: number, consultantInfo: Consultants, draftBody: AnswerDto
    return this.answerService.createDraft(+id, consultantInfo, draftBody);
  }

  @Get()
  findAll() {
    return this.consultantsService.findAll();
  }

  @Get('/question/:id')
  findOne(@Param('id') id: string) {
    return this.answerService.getAnswersForQuestion(+id);
  }
  // TODO: Implement get drafts feature
  @Get('/drafts')
  getDrafts(@UserInfo() consultantInfo: Users) {
    
    return this.answerService.getDrafts(consultantInfo);
  }
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateConsultantDto: UpdateConsultantDto) {
  //   return this.consultantsService.update(+id, updateConsultantDto);
  // }

  @Delete('answer/:id')
  remove(@Param('id') id: string) {
    return this.consultantsService.remove(+id);
  }
}
