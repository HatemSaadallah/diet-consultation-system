import { Consultants } from "src/modules/consultants/consultants.model";
import { QuestionAnswerDto } from "../dto/question-answer.dto";

export const AnswerObject = (answerBody: QuestionAnswerDto, consultantInfo: Consultants) => {
    return {
        consultantId: consultantInfo.id,
        consultantName: consultantInfo.username,
        title: answerBody.title,
        description: answerBody.description,
        recommendations: answerBody.recommendations,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
}