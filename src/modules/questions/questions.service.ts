import { Inject, Injectable } from "@nestjs/common";
import { REPOSITORIES } from "src/common/constants";
import { GetQuestionsDto } from "./dto/get-questions.dto";
import { QuestionAnswerDto } from "./dto/question-answer.dto";
import { Questions } from "./questions.model";

@Injectable()
export class QuestionsService {
    constructor(
        @Inject(REPOSITORIES.QUESTION_REPOSITORIES)
        private questionRepository: typeof Questions
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
    // TODO: Implement answering questions 
    
    // Post answer to question
    async answerQuestion(questionId: number, answerBody: QuestionAnswerDto) {
        const question = await this.questionRepository.findOne({
            where: {
                id: questionId
            }
        });
        if (!question) {
            throw new Error('Question not found');
        }
        question.questionAnswers.push(answerBody.answer);
        question.numberOfAnswers++;
        await question.save();
        return question;
    }

}