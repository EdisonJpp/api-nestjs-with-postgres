import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomUser } from '../models/room-user.model';

@Injectable()
export class RoomUserService {
  constructor(
    @InjectRepository(RoomUser)
    private readonly roomUserRepo: Repository<RoomUser>,
  ) {}

  async findByRoomId(roomId: number): Promise<RoomUser[]> {
    return this.roomUserRepo
      .createQueryBuilder('roomUser')
      .where('roomUser.roomId = :roomId', { roomId })
      .getMany();
  }
}
