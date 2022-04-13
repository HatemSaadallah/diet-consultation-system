import { Inject, Injectable } from "@nestjs/common";
import { REPOSITORIES } from "src/common/constants";
import { Answers } from "./answers.model";
import { AnswerDto } from "./dto/answer.dto";

@Injectable()
export class AnswersService {
    constructor(
        @Inject(REPOSITORIES.ANSWER_REPOSITORY)
        private answerRepository: typeof Answers,
    ) {}
    // TODO: Insert into the new table of Users
    async answerQuestion(questionId: number, answerBody: AnswerDto): Promise<Answers> {
        return this.answerRepository.create({
            ...answerBody,
            questionId: questionId,
            createdAt: new Date(),
        });
    }
}