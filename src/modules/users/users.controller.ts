import { UserModel } from './users.model';
import { AddUserDto } from './dto/user.dto';
import { UserService } from './users.service';
import { Public } from '../../resources/helpers/decorators';
import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Get('/')
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserModel, isArray: true })
  getAll() {
    return this.usersService.getUsers();
  }

  @Public()
  @Post('add')
  @ApiOkResponse({ type: UserModel })
  @ApiBody({ type: AddUserDto })
  addUser(@Body() body: AddUserDto) {
    return this.usersService.addUser(body);
  }
}
