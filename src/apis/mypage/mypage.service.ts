import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../auths/entities/user.entity';
import { RoomEntity } from '../rooms/entities/room.entity';
import { MyRoomUseDateResDTO } from './dto/my-page-response.dto';

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
}
