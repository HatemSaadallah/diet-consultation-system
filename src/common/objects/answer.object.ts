import { Users } from 'src/modules/users/users.model';
import { AnswerDto } from '../../modules/answers/dto/answer.dto';

export const AnswerObject = (answerBody: AnswerDto, userInfo: Users) => {
  return {
    userId: userInfo.id,
    userName: userInfo.username,
    title: answerBody.title,
    description: answerBody.description,
    recommendations: answerBody.recommendations,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};
