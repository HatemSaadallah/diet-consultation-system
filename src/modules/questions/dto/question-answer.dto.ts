import { IsNotEmpty } from "class-validator";

export class QuestionAnswerDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    recommendations: string;
}
