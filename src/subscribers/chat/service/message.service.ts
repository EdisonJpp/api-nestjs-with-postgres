import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';

import { MessageModel } from '../models/message.model';
import { RoomModel } from '../models/room.model';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageModel)
    private readonly messageRepository: Repository<MessageModel>,
  ) {}

  async create(message: MessageModel): Promise<MessageModel> {
    return this.messageRepository.save(this.messageRepository.create(message));
  }

  async findMessagesForRoom(
    room: RoomModel,
    options: IPaginationOptions,
  ): Promise<Pagination<MessageModel>> {
    const query = this.messageRepository
      .createQueryBuilder('message')
      .leftJoin('message.room', 'room')
      .where('room.id = :roomId', { roomId: room.id })
      .leftJoinAndSelect('message.user', 'user')
      .orderBy('message.created_at', 'DESC');

    return paginate(query, options);
  }
}
