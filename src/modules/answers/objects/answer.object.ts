import { Consultants } from "src/modules/consultants/consultants.model";
import { AnswerDto } from "../dto/answer.dto";

export const AnswerObject = (answerBody: AnswerDto, consultantInfo: Consultants) => {
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