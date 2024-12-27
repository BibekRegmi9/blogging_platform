import { IsNotEmpty, IsString } from "class-validator";

export class CreatePostDto {

    id: number;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsString()
    @IsNotEmpty()
    author: string;

    
}
