import { Transform, TransformFnParams } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { trimmer } from 'src/common/validators/trim.transform';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @Transform(trimmer)
  email: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: TransformFnParams) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  username: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsString()
  middleName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;
}
