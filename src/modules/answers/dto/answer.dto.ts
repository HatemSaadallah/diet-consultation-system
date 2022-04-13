import { IsNotEmpty } from "class-validator";

export class AnswerDto {
    @IsNotEmpty()
    answerTitle: string;

    @IsNotEmpty()
    answerDescription: string;

    @IsNotEmpty()
    answerRecommendations: string;
}
