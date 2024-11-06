import { Body, Controller, Get, Param, Patch, Post, Put, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { SetChatInputDto } from './dto/set-chat.dto';
import { statusCode } from 'src/commons/exception/status.code';
import { ChatsService } from './chats.service';
import { GetChatDto, GetChatInputDto } from './dto/get-chat.dto';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Chat (감정 대화 로그)')
@Controller('chat')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}
  /**
   * ## 감정 대화 저장(감정 대화 데이터 등록) API
   *
   * 도우와의 감정 대화를 저장
   * 여러 개의 Chat 데이터를 한 번에 List 형태로 전달받아 등록
   *
   * 필요 데이터:
   * - **userId**: 사용자 ID (int)
   * - **roomId**: 대화 방 ID (int)
   * - **recordId**: 기록 ID (int)
   * - **isUser**: 발화자 유형 (int)
   *   - 1이면 사용자
   *   - 0이면 로봇 (GPT/도우)
   * - **chatContext**: 채팅 내용 (string)
   * - **chatSent**: 감정 값 (int)
   *   - 채팅에 포함된 감정 점수
   * */
  @ApiOperation({ summary: '감정 대화 저장 API' })
  @ApiBody({ type: [SetChatInputDto], description: '저장할 감정 대화 데이터 리스트' })
  @ApiResponse({
    status: 200,
    description: '성공적으로 감정 대화를 불러옴',
    type: [GetChatInputDto], // 배열 형태로 GetChatInputDto 사용
  })
  @Post('')
  async setChat(@Body() setChatInputDto: SetChatInputDto[], @Res() response: Response) {
    const result: GetChatInputDto[] = await this.chatsService.setChat(setChatInputDto);

    response.status(200).json({
      ...statusCode.SUCCESS,
      data: result,
    });
  }

  /**
   * ## 감정 대화 내용 잘 가져와지는지 확인용 API
   *
   * 저장된 감정 대화 내용(채팅 내용) 최근 10개 불러오기
   *
   * */
  @ApiOperation({ summary: '감정 대화 내용 테스트 응답 API' })
  @ApiResponse({
    status: 200,
    description: '성공적으로 감정 대화를 불러옴',
    type: [GetChatInputDto], // 배열 형태로 GetChatInputDto 사용
  })
  @Get('test')
  async getAllChat(@Res() response: Response) {
    const result: GetChatDto[] = await this.chatsService.getAll();

    response.status(200).json({
      ...statusCode.SUCCESS,
      data: result,
    });
  }

  /**
   * ## 감정 대화 내용 가져오기
   *
   * 특정 채팅방(Record)의 감정 대화 가져오기
   *
   * 필요 데이터:
   * - **recordId**: 감정 대화를 진행 한 대화방 ID (int)
   * - **cursorId**: (필수 아님) cursorID (해당 ID부터 검색 시작) (int)
   * - **limit**: 받고 싶은 데이터의 개수 (int)
   * */
  @ApiOperation({ summary: '감정 대화 내용 전달 API' })
  @ApiResponse({
    status: 200,
    description: '성공적으로 감정 대화를 불러옴',
    type: [GetChatInputDto], // 배열 형태로 GetChatInputDto 사용
  })
  @Get('')
  @ApiQuery({ name: 'recordId', description: '조회할 기록 ID', required: true, example: 1 })
  @ApiQuery({ name: 'cursorId', description: '페이지네이션 커서 ID', required: false })
  @ApiQuery({ name: 'limit', description: '가져올 대화의 개수', required: false, example: 10 })
  async getChatToRecordId(
    @Query('recordId') recordId: number,
    @Query('cursorId') cursorId: number = -1,
    @Query('limit') limit: number = 10,
    @Res() response: Response,
  ) {
    const result: { data: GetChatDto[]; cursor: number } = await this.chatsService.getChatsToRecordId(
      cursorId,
      limit,
      recordId,
    );

    response.status(200).json({
      ...statusCode.SUCCESS,
      data: result.data,
      cursorId: result.cursor,
    });
  }
}
