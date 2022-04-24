import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { Consultants } from './consultants.model';
import { ConsultantsService } from './consultants.service';
import { CreateConsultantDto } from './dto/create-consultant.dto';
import { LoginConsultantDto } from './dto/login-consultant.dto';
import { ConsultantInterface } from './objects/consultant.object';
import { QuestionsService } from '../questions/questions.service';
import { GetQuestionsDto } from '../questions/dto/get-questions.dto';
import { AnswerDto } from '../answers/dto/answer.dto';
import { AnswersService } from '../answers/answers.service';
import { UserInfo } from 'src/common/decorators/user.decorator';
import { userInfo } from 'os';

@Controller('consultants')
export class ConsultantsController {
  constructor(
    private readonly consultantsService: ConsultantsService,
    private readonly questionsService: QuestionsService,
    private readonly answerService: AnswersService,
  ) { }

  @Public()
  @Post('signup')
  create(@Body() createConsultantDto: CreateConsultantDto) {
    
    return this.consultantsService.signup(createConsultantDto);
  }
  @Public()
  @Post('login')
  async login(@Body() loginInfo: LoginConsultantDto): Promise<ConsultantInterface> {
    return this.consultantsService.login(loginInfo);
  }
  @Get('questions')
  async getQuestions(@Body() options: GetQuestionsDto) {
    return this.questionsService.getQuestions(options);
  }

  @Post('answer/:id')
  answerQuestion(@UserInfo() consultantInfo: Consultants, @Param('id') id: string, @Body() answerBody: AnswerDto) {
   
    return this.answerService.answerQuestion(+id, answerBody, consultantInfo);
  }

  @Post('create-draft/:id')
  createDraft(@Param('id') id, @UserInfo() consultantInfo: Consultants, @Body() draftBody: AnswerDto) {

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



  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateConsultantDto: UpdateConsultantDto) {
  //   return this.consultantsService.update(+id, updateConsultantDto);
  // }

  @Delete('answer/:id')
  remove(@Param('id') id: string) {
    return this.consultantsService.remove(+id);
  }
}
