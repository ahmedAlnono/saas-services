import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class FindeUserDto {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  id?: number;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
