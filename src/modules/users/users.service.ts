import { FindOneOptions, Repository } from 'typeorm';
import { AddUserDto } from './dto/user.dto';
import { UserModel } from './users.model';
import { InjectRepository } from '@nestjs/typeorm';
import { passwordHash } from '../../resources/lib/bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
  ) {}

  getUsers = () => this.userRepository.find();

  getOne = (params: UserModel) => {
    return this.userRepository.findOne({
      where: params,
    } as FindOneOptions<UserModel>);
  };

  addUser = async (user: AddUserDto) => {
    const found = await this.userRepository.findOneBy({ email: user.email });

    if (found) {
      throw new HttpException(
        'This email already exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const payload = { ...user, password: await passwordHash(user.password) };
    return this.userRepository.save(this.userRepository.create(payload));
  };
}
