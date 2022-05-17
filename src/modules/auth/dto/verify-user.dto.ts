// import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UserVerificationDto {
  @IsNotEmpty()
  @IsNumber()
  verificationCode: string;
}
