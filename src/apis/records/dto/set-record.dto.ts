import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SetRecordInputDto {
  @IsNotEmpty()
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
