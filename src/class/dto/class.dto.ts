
import {IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class ClassDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    time: string;

    @IsNumber()
    @IsNotEmpty()
    duration: number;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    ageGroup: string;

    @IsNumber()
    @IsNotEmpty()
    rating: number;

    @IsString()
    @IsNotEmpty()
    comments: string;
}

export class EditClassDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    time?: string;

    @IsNumber()
    @IsOptional()
    duration?: number;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    ageGroup?: string;

    @IsNumber()
    @IsOptional()
    rating?: number;

    @IsString()
    @IsOptional()
    comments?: string;
}
