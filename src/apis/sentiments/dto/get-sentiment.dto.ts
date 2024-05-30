import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetSentimentInputDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  sentense: string;
}
