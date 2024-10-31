import { IsArray, IsNumber, IsPositive } from 'class-validator';

export class UpdateProjectPhotots {
  @IsArray({
    groups: ['string'],
  })
  photos: string[];

  @IsNumber()
  @IsPositive()
  userId: number;
}
