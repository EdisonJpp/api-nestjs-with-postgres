import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';

import { RoomModel } from '../models/room.model';
import { UserModel } from '../../../modules/users/users.model';
import { RoomUser } from '../models/room-user.model';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomModel)
    private readonly roomRepository: Repository<RoomModel>,
  ) {}

  async createRoom(room: RoomModel, creator: UserModel): Promise<RoomModel> {
    const newRoom = await this.addCreatorToRoom(room, creator);
    return this.roomRepository.save(newRoom);
  }

  async getRoom(roomId: number): Promise<RoomModel> {
    return this.roomRepository.findOne({
      where: { id: roomId },
      relations: ['users', 'users.user'],
    });
  }

  async getUserRooms(
    userId: number,
    options: IPaginationOptions,
  ): Promise<Pagination<RoomModel>> {
    const query = this.roomRepository
      .createQueryBuilder('room')
      .leftJoin('room.users', 'users')
      .where('users.id = :userId', { userId })
      .leftJoinAndSelect('room.users', 'all_users')
      .orderBy('room.updated_at', 'DESC');

    return paginate(query, options);
  }

  async addCreatorToRoom(
    room: RoomModel,
    creator: UserModel,
  ): Promise<RoomModel> {
    room.users.push({ user: creator } as RoomUser);
    return room;
  }
}
