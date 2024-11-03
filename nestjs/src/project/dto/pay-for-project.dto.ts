import { IsPositive, IsNumber } from 'class-validator';

export class PayForProjectDto {
  @IsNumber()
  @IsPositive()
  id: number;
}
