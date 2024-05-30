import { IsEnum, IsInstance, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { GPTSentimentQuery, reqTypeNames } from '../gpt-status.enum';

export class GetGptInputDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  context: string;

  @IsNotEmpty()
  @IsEnum(reqTypeNames)
  reqType: reqTypeNames;

  @IsNotEmpty()
  @IsEnum(GPTSentimentQuery)
  reqSent: GPTSentimentQuery;
}
export class GetGptSummaryDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  context: string;
}
