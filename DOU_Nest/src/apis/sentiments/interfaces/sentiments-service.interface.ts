import { GetSentimentInputDto } from '../dto/get-sentiment.dto';

export interface ISentimentsGetResult {
  sentence: string[];
}

export interface SentimentResult {
  sentence: string;
  sentiment: number;
  classes: number[];
}
