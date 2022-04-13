import { CACHE_MANAGER, Inject, Injectable, } from "@nestjs/common";
import { REPOSITORIES } from "src/common/constants";
import { Answers } from "./answers.model";
import { AnswerDto } from "./dto/answer.dto";
import { Cache } from 'cache-manager';
import { Consultants } from "../consultants/consultants.model";


@Injectable()
export class AnswersService {
    constructor(
        @Inject(REPOSITORIES.ANSWER_REPOSITORY)
        private answerRepository: typeof Answers,

        @Inject(CACHE_MANAGER) 
        private cacheManager: Cache
    ) {}
    // TODO: Insert into the new table of Users
    async answerQuestion(questionId: number, answerBody: AnswerDto): Promise<Answers> {
        const consultant: Consultants = await this.cacheManager.get('consultant'); 
        const consultantId = consultant.id;
        return this.answerRepository.create({
            ...answerBody,
            consultantId,
            questionId,
            createdAt: new Date(),
        });
    }
}