import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    fullname: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
    
    gender: string;
}
