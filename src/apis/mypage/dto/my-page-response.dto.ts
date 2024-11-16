import { ApiProperty } from '@nestjs/swagger';

export class MyRoomUseDateResDTO {
  @ApiProperty({
    description: '이용 기간',
    example: 1234,
  })
  useDate: number;
}

export class UserSentCountResDTO {
  @ApiProperty({
    description: '대상 감정',
    example: '행복',
  })
  useSent: string;

  @ApiProperty({
    description: '감정 개수',
    example: 1234,
  })
  sentCount: number;
}
