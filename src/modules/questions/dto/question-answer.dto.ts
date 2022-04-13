import { IsNotEmpty } from "class-validator";

export class QuestionAnswerDto {
    @IsNotEmpty()
    answer: string;
}
