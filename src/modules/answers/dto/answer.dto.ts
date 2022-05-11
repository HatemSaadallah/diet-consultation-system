import { IsNotEmpty } from 'class-validator';

export class AnswerDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  recommendations: string;
}
