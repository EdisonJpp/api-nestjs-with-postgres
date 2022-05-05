import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoomModel } from './models/room.model';
import { RoomUser } from './models/room-user.model';
import { MessageModel } from './models/message.model';
import { ConnectedUserModel } from './models/connected-user.model';

import { ChatGateway } from './chat.gateway';
import { RoomService } from './service/room.service';
import { MessageService } from './service/message.service';
import { RoomUserService } from './service/room-user.service';
import { AuthService } from '../../modules/auth/auth.service';
import { ConnectedUserService } from './service/connected-user.service';

import { AuthModule } from '../../modules/auth/auth.module';
import { UsersModule } from '../../modules/users/users.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TypeOrmModule.forFeature([
      RoomUser,
      RoomModel,
      MessageModel,
      ConnectedUserModel,
    ]),
  ],
  providers: [
    AuthService,
    ChatGateway,
    RoomService,
    ConnectedUserService,
    MessageService,
    RoomUserService,
  ],
})
export class ChatModule {}
