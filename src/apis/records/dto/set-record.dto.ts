import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SetRecordInputDto {
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value, 10)) // 문자열을 숫자로 변환
  @IsNumber()
  roomId: number;
}

export class SetRecordInputRecordIdDto {
  @IsNotEmpty()
  @IsNumber()
  recordId: number;
}

export class UpdateRecordDto {
  @IsNotEmpty()
  @IsNumber()
  recordId: number;

  @IsNotEmpty()
  @IsNumber()
  recordSent: number;

  @IsNotEmpty()
  @IsString()
  recordSummary: string;
}

// 업데이트 시
export class SetRecordUpdateDto {
  @IsNotEmpty()
  @IsNumber()
  recordId: number;

  @IsNotEmpty()
  @IsNumber()
  recordSent: number;

  @IsNotEmpty()
  @IsString()
  recordSummary: string;

  @IsNotEmpty()
  @IsNumber()
  roomId: number;
}
