import { Transform, TransformFnParams } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString} from "class-validator";


export class LoginUserDto {
    @IsNotEmpty()
    @IsEmail()
    @Transform(({ value }: TransformFnParams) =>
        typeof value === 'string' ? value.trim().toLowerCase() : value,
    )
    loginToken: string;

    @IsNotEmpty()
    password: string;
}
