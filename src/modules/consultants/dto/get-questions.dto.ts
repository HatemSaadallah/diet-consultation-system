import { Transform, TransformFnParams } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString} from "class-validator";


export class GetQuestionsDto {
    size: number;
    page: number;
}
