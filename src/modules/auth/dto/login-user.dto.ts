import { Transform, TransformFnParams } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }: TransformFnParams) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  username: string;

  @IsNotEmpty()
  password: string;
}
