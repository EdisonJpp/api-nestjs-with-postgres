import { FindManyOptions, In, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from '../../../modules/users/users.model';
import { ConnectedUserModel } from '../models/connected-user.model';

@Injectable()
export class ConnectedUserService {
  constructor(
    @InjectRepository(ConnectedUserModel)
    private readonly connectedUserRepository: Repository<ConnectedUserModel>,
  ) {}

  async create(connectedUser: ConnectedUserModel): Promise<ConnectedUserModel> {
    return this.connectedUserRepository.save(connectedUser);
  }

  async findByUser(
    user: UserModel = {} as UserModel,
  ): Promise<ConnectedUserModel[]> {
    return this.connectedUserRepository.findBy({ ...user });
  }

  findByUserIds(userIds: number[]) {
    return this.connectedUserRepository.findBy({ userId: In(userIds) });
    // return this.connectedUserRepository
    //   .createQueryBuilder('connection')
    //   .where('connection.userId IN(:...userIds)', { userIds })
    //   .distinctOn(['connection.userId'])
    //   .orderBy('connection.id', 'DESC')
    //   .limit(userIds.length)
    //   .getMany();
  }

  async deleteBySocketId(socketId: string) {
    return this.connectedUserRepository.delete({ socketId });
  }

  async deleteAll() {
    await this.connectedUserRepository.createQueryBuilder().delete().execute();
  }
}
