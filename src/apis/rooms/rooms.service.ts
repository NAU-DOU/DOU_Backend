import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { Between, Repository } from 'typeorm';
import { RoomEntity } from './entities/room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { GetRoomDto } from './dto/get-room.dto';
import { start } from 'repl';
import { SetRoomInputDto, UpdateRoomInputDto } from './dto/set-room.dto';
import { CustomException } from 'src/commons/exception/custom.exception';
import { statusCode } from 'src/commons/exception/status.code';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(RoomEntity)
    private roomRepository: Repository<RoomEntity>,
  ) {}

  /**
   * Calendar Data Entity
   * @example ['calendar']
   */
  async findAll(): Promise<GetRoomDto[]> {
    const rooms = await this.roomRepository.find();
    return rooms.map((room) => {
      return plainToClass(GetRoomDto, room);
    });
  }

  // Date에 따라 Room 불러오기
  async findRoomsToDate(date: string): Promise<RoomEntity[]> {
    const startDate = new Date(date + 'T00:00:00.000Z');
    const endDate = new Date(startDate);

    endDate.setDate(startDate.getDate() + 1);

    return await this.roomRepository.find({
      where: {
        room_date: Between(startDate, endDate),
      },
    });
  }

  // RoomId에 따라 Room 불러오기
  async findRoomToId(id: number): Promise<RoomEntity> {
    return await this.roomRepository.findOne({
      where: {
        room_id: id,
      },
    });
  }

  async setRoomToId(setRoomDto: SetRoomInputDto): Promise<RoomEntity> {
    const { roomUserId, roomSent } = setRoomDto;

    const room = new RoomEntity();
    room.user_id = roomUserId;
    room.room_sent = roomSent;

    return await this.roomRepository.save(room);
  }

  async updateRoomToId(updateRoomInputDto: UpdateRoomInputDto): Promise<RoomEntity> {
    const { roomId, roomSent } = updateRoomInputDto;
    const room = await this.roomRepository.findOne({
      where: { room_id: roomId },
    });

    if (!room) throw new CustomException(statusCode.NOT_FOUND, statusCode.NOT_FOUND['status']);
    room.room_sent = roomSent;
    return this.roomRepository.save(room);
  }
}
