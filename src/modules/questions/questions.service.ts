import { Inject, Injectable, CACHE_MANAGER} from "@nestjs/common";
import { REPOSITORIES } from "src/common/constants";
import { GetQuestionsDto } from "./dto/get-questions.dto";
import { QuestionAnswerDto } from "./dto/question-answer.dto";
import { AnswerObject } from "./objects/answer.object";
import { Questions } from "./questions.model";
import { Cache } from "cache-manager";
import { Consultants } from "../consultants/consultants.model";

@Injectable()
export class QuestionsService {
    constructor(
        @Inject(REPOSITORIES.QUESTION_REPOSITORIES)
        private questionRepository: typeof Questions,

        @Inject(CACHE_MANAGER) 
        private cacheManager: Cache
    ) { }

    getQuestions(options: GetQuestionsDto) {
        let { size, page } = options;
        size = size || 5;
        page = page || 1;


        return this.questionRepository.findAll({
            order: [
                ['number_of_answers', 'ASC'],
                ['created_at', 'DESC']
            ],
            limit: size,
            offset: (page - 1) * size,
        });
    }
    getQuestionById(id: number) {
        return this.questionRepository.findOne({
            where: {
                id
            }
        });
    }
    // DONE: Implement answering questions 
    
    // Post answer to question
    async answerQuestion(questionId: number, answerBody: QuestionAnswerDto) {
        const question: Questions = await this.questionRepository.findOne({
            where: {
                id: questionId
            }
        });
        if (!question) {
            throw new Error('Question not found');
        }
        const consultantInfo: Consultants = await this.cacheManager.get('consultant');
        const answerObject = AnswerObject(answerBody, consultantInfo);
        question.questionAnswers = [answerObject, ...question.questionAnswers];
        question.numberOfAnswers++;
        await question.save();
        return question;
    }

}