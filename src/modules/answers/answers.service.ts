import { HttpException, HttpStatus, Inject, Injectable, } from "@nestjs/common";
import { REPOSITORIES } from "src/common/constants";
import { Answers } from "./answers.model";
import { AnswerDto } from "./dto/answer.dto";
import { Users } from "../users/users.model";
import { Questions } from "../questions/questions.model";


@Injectable()
export class AnswersService {
    constructor(
        @Inject(REPOSITORIES.ANSWER_REPOSITORY)
        private answerRepository: typeof Answers,

        @Inject(REPOSITORIES.QUESTION_REPOSITORY)
        private questionRepository: typeof Questions,

        @Inject(REPOSITORIES.USER_REPOSITORY)
        private userRepository: typeof Users,
    ) { }
    // DONE: Insert into the new table of Users
    async answerQuestion(questionId: number, answerBody: AnswerDto, userInfo: Users): Promise<Answers> {
        const { id } = userInfo;

        // update the question
        await this.questionRepository.increment('numberOfAnswers', {
            where: {
                id: questionId
            }
        });
        return this.answerRepository.create({
            ...answerBody,
            userId: id,
            isDraft: new Date(),
            questionId,
            createdAt: new Date(),
        });
    }
    // Create draft
    // TODO: Implement draft feature
    async createDraft(questionId: number, userInfo: Users, draftBody: AnswerDto) {
        const { id } = userInfo;
        const question = await this.questionRepository.findOne({
            where: {
                id: questionId
            }
        });
        if (!question) {
            throw new HttpException({
                    status: HttpStatus.BAD_REQUEST,
                    error: "Question not found"
                },
                HttpStatus.BAD_REQUEST
            );
        }
        // update the question
        await this.questionRepository.increment('numberOfAnswers', {
            where: {
                id: questionId
            }
        });
        return this.answerRepository.create({
            ...draftBody,
            userId: id,
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

    getDrafts(userInfo: Users) {
        const { id } = userInfo;
        return this.answerRepository.findAll({
            where: {
                userId: id,
                // If zero is returned, then the answer is a draft
                isDraft: 0
            }
        });
    }
}