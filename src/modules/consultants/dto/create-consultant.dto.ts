import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString} from "class-validator";
import { Unique } from 'sequelize-typescript';

export class CreateConsultantDto {
    @IsNotEmpty()
    @IsString()
    @Transform(({ value }: TransformFnParams) =>
        typeof value === 'string' ? value.trim().toLowerCase() : value,
    )
    email: string;

    @IsNotEmpty()
    @IsString()
    @Transform(({ value }: TransformFnParams) =>
        typeof value === 'string' ? value.trim().toLowerCase() : value,
    )
    username: string;

    
}
