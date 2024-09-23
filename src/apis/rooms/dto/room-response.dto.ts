export class RoomResponseDto {
  userId: number;
  userNickname: string;
  roomSent: number;
  roomId: number;
  roomDate: Date;
  createdAt: Date;

  constructor(partial: Partial<RoomResponseDto>) {
    Object.assign(this, partial);
  }
}
