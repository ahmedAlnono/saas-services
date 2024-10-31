import { IsPositive, IsNumber } from 'class-validator';

export class PayForProjectDto {
  @IsNumber()
  @IsPositive()
  quantity: number;

  @IsNumber()
  @IsPositive()
  id: number;
}
