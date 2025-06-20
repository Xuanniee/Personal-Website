import { IsArray, IsDate, IsInt, IsString } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";

import { InternAchievement } from "@prisma/client";

export class CreateInternshipDto {
    @IsString()
    intern_title: string;
    
    @IsString()
    company: string;

    @IsDate()
    start_date: Date;

    @IsDate()
    end_date: Date;

    @IsArray()
    @IsString({ each: true })
    achievements: InternAchievement[];
}

// Update is just optional all fields
export class UpdateInternshipDto extends PartialType(CreateInternshipDto) {};

// Original Internship object
export class InternshipDto extends CreateInternshipDto {
    @IsInt()
    id: number;
}