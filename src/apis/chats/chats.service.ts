import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatEntity } from './entities/chat.entity';
import { Repository } from 'typeorm';
import { RoomEntity } from '../rooms/entities/room.entity';
import { PaginationDto, SetChatInputDto } from './dto/set-chat.dto';
import { RecordEntity } from '../records/entities/record.entity';
import { CustomException } from 'src/commons/exception/custom.exception';
import { statusCode } from 'src/commons/exception/status.code';
import { plainToClass } from 'class-transformer';
import { GetChatDto, GetChatInputDto } from './dto/get-chat.dto';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(ChatEntity)
    private chatRepository: Repository<ChatEntity>,
    @InjectRepository(RecordEntity)
    private recordRepository: Repository<RecordEntity>,
  ) {}

  async getAll(): Promise<GetChatDto[]> {
    const chats = await this.chatRepository.find({ take: 10 });
    return chats.map((chat) => {
      return plainToClass(GetChatDto, chat);
    });
  }

  async getChatsToRecordId(
    paging: number,
    limit: number,
    recordId: number,
  ): Promise<{ data: GetChatDto[]; count: number }> {
    const skip = (paging - 1) * limit;
    const [chats, totalCount] = await this.chatRepository
      .createQueryBuilder('chat')
      .leftJoinAndSelect('chat.record', 'record')
      .where('record.rec_id = :recordId', { recordId })
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const data = chats.map((chat) =>
      plainToClass(GetChatDto, {
        chatId: chat.chat_id,
        recordId: chat.record.rec_id,
        isUser: chat.is_user,
        createdAt: chat.created_at,
        chatSent: chat.chat_sent,
        chatContext: chat.chat_context,
      }),
    );

    const count = data.length > 0 ? data[data.length - 1].chatId : 0;

    return { data, count };
  }

  async setChat(items: SetChatInputDto[]): Promise<GetChatInputDto[]> {
    const resultList: GetChatInputDto[] = [];
    for (const item of items) {
      const chatEntity = new ChatEntity();
      const record = await this.recordRepository.findOne({ where: { rec_id: item.recordId } });
      if (!record) {
        throw new CustomException(statusCode.NOT_FOUND, statusCode.NOT_FOUND['status']);
      }
      chatEntity.chat_context = item.chatContext;
      chatEntity.chat_sent = item.chatSent;
      chatEntity.is_user = item.isUser;
      chatEntity.record = record;
      const data = await this.chatRepository.save(chatEntity);
      resultList.push(
        plainToClass(GetChatInputDto, {
          chatId: data.chat_id,
          recordId: data.record.rec_id,
          isUser: data.is_user,
          createdAt: data.created_at,
          chatSent: data.chat_sent,
          chatContext: data.chat_context,
        }),
      );
    }
    return resultList;
  }
}
