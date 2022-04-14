import { Consultants } from "src/modules/consultants/consultants.model";
import { AnswerDto } from "../dto/answer.dto";

export const AnswerObject = (answerBody: AnswerDto, consultantInfo: Consultants) => {
    return {
        consultantId: consultantInfo.id,
        consultantName: consultantInfo.username,
        title: answerBody.answerTitle,
        description: answerBody.answerDescription,
        recommendations: answerBody.answerRecommendations,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
}