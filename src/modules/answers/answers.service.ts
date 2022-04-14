import { CACHE_MANAGER, Inject, Injectable, } from "@nestjs/common";
import { REPOSITORIES } from "src/common/constants";
import { Answers } from "./answers.model";
import { AnswerDto } from "./dto/answer.dto";
import { Cache } from 'cache-manager';
import { Consultants } from "../consultants/consultants.model";
import { Questions } from "../questions/questions.model";


@Injectable()
export class AnswersService {
    constructor(
        @Inject(REPOSITORIES.ANSWER_REPOSITORY)
        private answerRepository: typeof Answers,

        @Inject(REPOSITORIES.QUESTION_REPOSITORY)
        private questionRepository: typeof Questions,

        @Inject(REPOSITORIES.CONSULTANT_REPOSITORY)
        private consultantRepository: typeof Consultants,

        @Inject(CACHE_MANAGER)
        private cacheManager: Cache
    ) { }
    // DONE: Insert into the new table of Users
    async answerQuestion(questionId: number, answerBody: AnswerDto): Promise<Answers> {
        const consultant: Consultants = await this.cacheManager.get('consultant');
        const consultantId = consultant.id;

        // update the question
        await this.questionRepository.increment('numberOfAnswers', {
            where: {
                id: questionId
            }
        });
        return this.answerRepository.create({
            ...answerBody,
            consultantId,
            questionId,
            createdAt: new Date(),
        });
    }

    // DONE: return question info with answers
    async getAnswersForQuestion(id: number) {
        this.questionRepository.hasMany(this.answerRepository, { foreignKey: 'questionId' });
        const question = await this.questionRepository.findOne({
            where: {
                id
            },
            include: [{
                model: Answers,
                required: false,
            }]
        });
        if (!question) {
            return "Question Not Found";
        }


        return { question };
    }
}