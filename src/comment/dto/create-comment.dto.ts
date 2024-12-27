import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCommentDto {
    @IsNumber()
    @IsNotEmpty()
    post_id: number;

    @IsString()
    @IsNotEmpty()
    comment: string;
}
