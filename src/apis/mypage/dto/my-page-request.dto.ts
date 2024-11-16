import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetUserSentCountReqDTO {
  @ApiProperty({
    description: '감정 코드',
    example: 0,
  })
  @IsNotEmpty()
  @IsNumber()
  sentCode: number;
}
