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
    ) { }
    // DONE: Insert into the new table of Users
    async answerQuestion(questionId: number, answerBody: AnswerDto, consultantInfo: Consultants): Promise<Answers> {
        const { id } = consultantInfo;

        // update the question
        await this.questionRepository.increment('numberOfAnswers', {
            where: {
                id: questionId
            }
        });
        return this.answerRepository.create({
            ...answerBody,
            consultantId: id,
            isDraft: new Date(),
            questionId,
            createdAt: new Date(),
        });
    }
    // Create draft
    // TODO: Implement draft feature
    async createDraft(questionId: number, consultantInfo: Consultants, draftBody: AnswerDto) {
        const { id } = consultantInfo;

        // update the question
        await this.questionRepository.increment('numberOfAnswers', {
            where: {
                id: questionId
            }
        });
        return this.answerRepository.create({
            ...draftBody,
            consultantId: id,
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

    getDrafts(consultantInfo: Consultants) {
        const { id } = consultantInfo;
        return this.answerRepository.findAll({
            where: {
                consultantId: id,
                // If zero is returned, then the answer is a draft
                isDraft: 0
            }
        });
    }
}