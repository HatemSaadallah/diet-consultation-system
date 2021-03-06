import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { REPOSITORIES } from 'src/common/constants';
import { Answers } from './answers.model';
import { AnswerDto } from './dto/answer.dto';
import { QuestionsService } from '../questions/questions.service';
import { CustomLogger } from 'src/common/loggers/winston.logger';
import { UserInfoDto } from 'src/common/dto/user-info.dto';

@Injectable()
export class AnswersService {
  constructor(
    @Inject(REPOSITORIES.ANSWER_REPOSITORY)
    private answerRepository: typeof Answers,

    private questionsService: QuestionsService,
  ) {}
  private readonly logger = new CustomLogger();

  async answerQuestion(
    questionId: number,
    answerBody: AnswerDto,
    userInfo: UserInfoDto,
  ): Promise<Answers> {
    const { id } = userInfo;
    this.logger.log(`Attempting to answer question ${questionId}`);
    // update the question
    await this.questionsService.incrementNumberOfAnswers(questionId);
    return this.answerRepository.create({
      ...answerBody,
      createdBy: id,
      isDraft: new Date(),
      questionId,
      createdAt: new Date(),
    });
  }

  async createDraft(
    questionId: number,
    userInfo: UserInfoDto,
    draftBody: AnswerDto,
  ) {
    this.logger.log(`Attempting to create draft for question ${questionId}`);
    const { id } = userInfo;
    const question = await this.questionsService.getQuestionById(questionId);
    if (!question) {
      this.logger.error(`Question with id ${questionId} not found`);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Question not found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // Check of draft exists
    const draft = await this.getDraftByUserIdAndQuestionId(
      userInfo.id,
      questionId,
    );

    if (draft) {
      // Update draft
      await this.answerRepository.update(
        {
          ...draftBody,
          createdBy: id,
          questionId,
          createdAt: new Date(),
        },
        {
          where: {
            id: draft.id,
          },
        },
      );
    } else {
      // update the question
      this.questionsService.incrementNumberOfAnswers(questionId);
      return this.answerRepository.create({
        ...draftBody,
        createdBy: id,
        questionId,
        createdAt: new Date(),
      });
    }
    return {
      message: 'Draft updated',
      ...draftBody,
      createdBy: id,
      questionId,
      createdAt: new Date(),
    };
  }

  getDraftByUserIdAndQuestionId(userId: number, questionId: number) {
    this.logger.log(
      `Attempting to get draft for user ${userId} and question ${questionId}`,
    );
    return this.answerRepository.findOne({
      where: {
        createdBy: userId,
        questionId,
        isDraft: 0,
      },
    });
  }

  async getAnswersForQuestion(id: number) {
    this.logger.log(`Attempting to get answers for question ${id}`);
    // Get Question by ID
    const question = await this.questionsService.getQuestionById(id);
    if (!question) {
      return 'Question Not Found';
    }

    // Get Answers By ID
    const answers = await this.answerRepository.findAll({
      where: {
        questionId: id,
      },
    });

    return {
      question,
      answers,
    };
  }

  getDrafts(userInfo: UserInfoDto) {
    this.logger.log(`Attempting to get drafts for user ${userInfo.id}`);
    const { id } = userInfo;
    return this.answerRepository.findAll({
      where: {
        createdBy: id,
        isDraft: 0,
      },
    });
  }
}
