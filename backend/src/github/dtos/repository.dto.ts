import { PartialType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class RepositoryDto {
  @IsNumber()
  id: Number;

  @IsString()
  name: string;

  @IsString()
  full_name: string;

  @IsBoolean()
  private: boolean;

  @IsString()
  html_url: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  language?: string;

  @IsNumber()
  stargazers_count: number;

  @IsNumber()
  open_issues: number;

  @IsNumber()
  forks_count: number;

  @IsDateString()
  created_at: string;

  @IsOptional()
  @IsDateString()
  updated_at?: string;

  @IsOptional()
  @IsDateString()
  pushed_at?: string;

  @IsOptional()
  @IsString()
  homepage?: string;
}

export class UpdateRepositoryDto extends PartialType(RepositoryDto) {
  // override to make required again
  @IsNumber()
  id: number;
}
