import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RoomEntity } from './entities/room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { GetRoomSelectDto } from './dto/get-room.dto';
import { SetRoomInputDto, UpdateRoomInputDto } from './dto/set-room.dto';
import { CustomException } from 'src/commons/exception/custom.exception';
import { statusCode } from 'src/commons/exception/status.code';
import { UserEntity } from '../auths/entities/user.entity';
import { RoomPatchResponseDto, RoomResponseDto } from './dto/room-response.dto';
import { toZonedTime } from 'date-fns-tz';
import { add } from 'date-fns';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(RoomEntity)
    private roomRepository: Repository<RoomEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  /**
   */
  async getAllRoom(cursorId: number, limit: number): Promise<{ data: GetRoomSelectDto[]; cursor: number }> {
    const queryBuilderFactory = this.roomRepository.createQueryBuilder('room').leftJoinAndSelect('room.user', 'user');

    if (cursorId > 0) {
      queryBuilderFactory.andWhere('room.room_id < :cursorId', { cursorId });
    }

    queryBuilderFactory.orderBy('room.room_id', 'DESC').take(limit);

    const [rooms, totalCount] = await queryBuilderFactory.getManyAndCount();

    const data = rooms.map((room) =>
      plainToClass(GetRoomSelectDto, {
        roomId: room.room_id,
        roomDate: room.room_date,
        roomUserId: room.user.user_id,
        roomSent: room.room_sent,
      }),
    );

    const cursor = data.length > 0 ? data[data.length - 1].roomId : 0;

    return { data, cursor };
  }

  // Date에 따라 Room 불러오기
  async findRoomsToDate(
    cursorId: number,
    limit: number,
    date: string,
  ): Promise<{ data: GetRoomSelectDto[]; cursor: number }> {
    const startDate = new Date(date + 'T00:00:00.000Z');
    const endDate = new Date(startDate);

    endDate.setDate(startDate.getDate() + 1);

    const queryBuilderFactory = this.roomRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.user', 'user')
      .where('room.room_date BETWEEN :startDate AND :endDate', { startDate, endDate });

    if (cursorId > 0) {
      queryBuilderFactory.andWhere('room.room_id < :cursorId', { cursorId });
    }

    queryBuilderFactory.orderBy('room.room_id', 'DESC').take(limit);

    const [rooms, totalCount] = await queryBuilderFactory.getManyAndCount();

    const data = rooms.map((room) =>
      plainToClass(GetRoomSelectDto, {
        roomId: room.room_id,
        roomDate: room.room_date,
        roomUserId: room.user.user_id,
        roomSent: room.room_sent,
      }),
    );

    const cursor = data.length > 0 ? data[data.length - 1].roomId : 0;

    return { data, cursor };
  }

  // userId에 따라 Room 불러오기
  async findRoomsToUser(
    cursorId: number,
    limit: number,
    userId: number,
  ): Promise<{ data: GetRoomSelectDto[]; cursor: number }> {
    const queryBuilderFactory = this.roomRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.user', 'user')
      .where('room.room_user_id = :userId', { userId });

    if (cursorId > 0) {
      queryBuilderFactory.andWhere('room.room_id < :cursorId', { cursorId });
    }

    queryBuilderFactory.orderBy('room.room_id', 'DESC').take(limit);

    const [rooms, totalCount] = await queryBuilderFactory.getManyAndCount();

    const data = rooms.map((room) =>
      plainToClass(GetRoomSelectDto, {
        roomId: room.room_id,
        roomDate: room.room_date,
        roomUserId: room.user.user_id,
        roomSent: room.room_sent,
      }),
    );

    const cursor = data.length > 0 ? data[data.length - 1].roomId : 0;

    return { data, cursor };
  }

  // RoomId에 따라 Room 불러오기
  async findRoomToId(id: number): Promise<RoomEntity> {
    return await this.roomRepository.findOne({
      where: {
        room_id: id,
      },
    });
  }

  async setRoomToId(setRoomDto: SetRoomInputDto): Promise<RoomResponseDto> {
    const { roomUserId, roomSent } = setRoomDto;

    // UserEntity를 roomUserId로 찾음
    const user = await this.userRepository.findOne({ where: { user_id: roomUserId } });

    if (!user) throw new CustomException(statusCode.NOT_FOUND, statusCode.NOT_FOUND['status']);

    const room = new RoomEntity();
    room.user = user;
    room.room_sent = roomSent;

    const result = await this.roomRepository.save(room);

    return new RoomResponseDto({
      userId: result.user.user_id,
      userNickname: result.user.user_nickname,
      roomSent: result.room_sent,
      roomId: result.room_id,
      roomDate: result.room_date,
      createdAt: result.created_at,
    });
  }

  async updateRoomToId(updateRoomInputDto: UpdateRoomInputDto): Promise<RoomPatchResponseDto> {
    const { roomId, roomSent } = updateRoomInputDto;
    const room = await this.roomRepository.findOne({
      where: { room_id: roomId },
      relations: ['user'],
    });

    if (!room) throw new CustomException(statusCode.NOT_FOUND, statusCode.NOT_FOUND['status']);
    room.room_sent = roomSent;
    room.updated_at = add(toZonedTime(new Date(), 'Asia/Seoul'), { hours: 9 });

    const result = await this.roomRepository.save(room);

    return new RoomPatchResponseDto({
      roomSent: result.room_sent,
      roomId: result.room_id,
      roomDate: result.room_date,
      updatedAt: result.updated_at,
      userId: result.user.user_id,
    });
  }
}
