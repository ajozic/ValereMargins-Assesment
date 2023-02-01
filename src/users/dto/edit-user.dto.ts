import { IsEmail, IsNumber, IsOptional, IsString } from "class-validator";

export class EditUserDto {

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    password?: string;

    @IsString()
    @IsOptional()
    firstName?: string;

    @IsString()
    @IsOptional()
    lastName?: string;

    @IsNumber()
    @IsOptional()
    age?: number;

    @IsOptional()
    isEnrolled?: boolean;

}