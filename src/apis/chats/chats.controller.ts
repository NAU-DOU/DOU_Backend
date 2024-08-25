import { Body, Controller, Get, Param, Patch, Post, Put, Query, Res } from '@nestjs/common';
import { response, Response } from 'express';
import { PaginationDto, SetChatInputDto } from './dto/set-chat.dto';
import { statusCode } from 'src/commons/exception/status.code';
import { ChatsService } from './chats.service';
import { GetChatDto, GetChatInputDto } from './dto/get-chat.dto';

@Controller('chat')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}
  /**
   * Chat 데이터 등록 (List로 전달)
   * 필요 Data
   * - userId: int
   * - roomId: int
   * - recordId: int
   * - isUser: int (1이면 사람, 0이면 로봇(GPT/도우))
   * - chatContext: string
   * - chatSent: int (채팅 별 감정)
   */
  @Post('')
  async setChat(@Body() setChatInputDto: SetChatInputDto[], @Res() response: Response) {
    const result: GetChatInputDto[] = await this.chatsService.setChat(setChatInputDto);

    response.status(200).json({
      ...statusCode.SUCCESS,
      data: result,
    });
  }

  @Get('test')
  async getAllChat(@Res() response: Response) {
    const result: GetChatDto[] = await this.chatsService.getAll();

    response.status(200).json({
      ...statusCode.SUCCESS,
      data: result,
    });
  }

  @Get('')
  async getChatToRecordId(
    @Query('recordId') recordId: number,
    @Query('paging') paging: number,
    @Query('limit') limit: number,
    @Res() response: Response,
  ) {
    console.log(recordId);
    const result: { data: GetChatDto[]; count: number } = await this.chatsService.getChatsToRecordId(
      paging,
      limit,
      recordId,
    );

    response.status(200).json({
      ...statusCode.SUCCESS,
      data: result.data,
      paging: result.count,
    });
  }
}

/**
 * Chat 추가 - 각자 방에 들어가서 대화한 내용
 * 대화한 내용 추가. 각 주제 별로 대화한 내용 추가
 * chat 내용 / 사용자의 내용인지 여부 / 각 내용 별 감정
 */
