import {
  IsDate,
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

  @IsOptional()
  @IsDate()
  @IsNotEmpty()
  deadLine: Date;

  @IsNumber()
  @IsPositive()
  maker: number;

  @IsNumber()
  @IsPositive()
  owner: number;
}
