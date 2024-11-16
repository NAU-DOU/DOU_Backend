import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../auths/entities/user.entity';
import { RoomEntity } from '../rooms/entities/room.entity';
import { MyRoomUseDateResDTO, UserSentCountResDTO } from './dto/my-page-response.dto';
import { GPTSentimentQuery } from '../gpt/gpt-status.enum';
import { CustomException } from 'src/commons/exception/custom.exception';
import { statusCode } from 'src/commons/exception/status.code';
import { GetUserSentCountReqDTO } from './dto/my-page-request.dto';

@Injectable()
export class MyPageService {
  constructor(
    @InjectRepository(RoomEntity)
    private roomRepository: Repository<RoomEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  // 사용자 사용 기간 계산
  async calUseUserDate(user): Promise<MyRoomUseDateResDTO> {
    const currentDate = new Date();
    const queryBuilderFactory = this.userRepository
      .createQueryBuilder('user')
      .select('user.created_at', 'createdAt') // 특정 컬럼만 선택
      .where('user.user_id=:userId', { userId: user.id });

    const dbResult = await queryBuilderFactory.getRawOne();
    const createDate = new Date(dbResult.createdAt);

    const differenctInDate = currentDate.getTime() - createDate.getTime();
    // 일 수로 변환
    const differenceInDays = Math.floor(differenctInDate / (1000 * 60 * 60 * 24));

    return { useDate: differenceInDays };
  }

  async countUserSent(user, req: GetUserSentCountReqDTO): Promise<UserSentCountResDTO> {
    const values = Object.values(GPTSentimentQuery);
    let useSent = undefined;
    // 유효한 인덱스인지 확인 후 반환
    if (req.sentCode >= 0 && req.sentCode < values.length) {
      useSent = values[req.sentCode];
    } else {
      throw new CustomException(statusCode.BAD_REQUEST, statusCode.BAD_REQUEST['status']);
    }

    const countSent = await this.roomRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.user', 'user')
      .where('room.room_user_id = :userId', { userId: user.id })
      .andWhere('room.room_sent = :roomSent', { roomSent: req.sentCode })
      .getCount();

    return {
      useSent: useSent,
      sentCount: countSent,
    };
  }
}
