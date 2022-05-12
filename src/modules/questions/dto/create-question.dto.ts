import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { trimmer } from 'src/common/validators/trim.transform';

export class CreateQuestionDto {
  @IsNotEmpty()
  @IsString()
  @Transform(trimmer)
  title: string;

  @IsNotEmpty()
  @IsString()
  @Transform(trimmer)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  createdBy: number;
}
