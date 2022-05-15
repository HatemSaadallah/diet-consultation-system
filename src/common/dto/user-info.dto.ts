import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserInfoDto {
  @IsNumber()
  id: number;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  role: string;
}
