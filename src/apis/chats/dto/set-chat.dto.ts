import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from 'class-validator';

export class SetChatInputDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  roomId: number;

  @IsNotEmpty()
  @IsNumber()
  isUser: number;

  @IsNotEmpty()
  @IsNumber()
  recordId: number;

  @IsNotEmpty()
  @IsString()
  chatContext: string;

  @IsNotEmpty()
  @IsNumber()
  chatSent: number;
}

// pagination
export class PaginationDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Min(1)
  paging?: number = 1; // 기본 값은 1

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Min(1)
  limit?: number = 10; // 기본 값은 10
}
