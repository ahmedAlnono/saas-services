import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsString({
    each: true,
  })
  stack: string[];

  @IsOptional()
  @IsDateString()
  @IsNotEmpty()
  deadLine: Date;

  @IsNumber()
  @IsPositive()
  maker: number;
}
