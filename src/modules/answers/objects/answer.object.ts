import { Users } from "src/modules/users/users.model";
import { AnswerDto } from "../dto/answer.dto";

export const AnswerObject = (answerBody: AnswerDto, userInfo: Users) => {
    return {
        userId: userInfo.id,
        userName: userInfo.username,
        title: answerBody.answerTitle,
        description: answerBody.answerDescription,
        recommendations: answerBody.answerRecommendations,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
}