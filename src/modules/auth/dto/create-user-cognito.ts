import { IsNotEmpty } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class CreateUserCognitoDto extends CreateUserDto {
  @IsNotEmpty()
  password: string;
}
