import { Server, Socket } from 'socket.io';
import { OnModuleInit, UnauthorizedException } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { AuthService } from '../../modules/auth/auth.service';
import { UserService } from '../../modules/users/users.service';

import { Page } from './models/page.model';
import { RoomModel } from './models/room.model';
import { MessageModel } from './models/message.model';

import { RoomService } from './service/room.service';
import { MessageService } from './service/message.service';
import { ConnectedUserService } from './service/connected-user.service';
import { ConnectedUserModel } from './models/connected-user.model';
import { RoomUserService } from './service/room-user.service';
import { RoomUser } from './models/room-user.model';

@WebSocketGateway({
  namespace: 'chat',
  cors: {
    origin: '*',
  },
})
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit
{
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private roomService: RoomService,
    private roomUserService: RoomUserService,
    private messageService: MessageService,
    private connectedUserService: ConnectedUserService,
  ) {}

  @WebSocketServer()
  server: Server;

  async onModuleInit() {
    await this.connectedUserService.deleteAll();
  }

  async handleConnection(socket: Socket) {
    try {
      const decoded = await this.authService.verifyJwt(
        socket.handshake.headers.authorization,
      );

      if (!decoded.item) return this.disconnect(socket);
      const user = await this.userService.getOne(decoded.item);
      if (!user) return this.disconnect(socket);

      const rooms = await this.roomService.getUserRooms(user.id, {
        page: 1,
        limit: 10,
      });

      rooms.meta.currentPage = rooms.meta.currentPage - 1;
      socket.data.user = user;

      await this.connectedUserService.create({
        socketId: socket.id,
        user,
      });

      return this.server.to(socket.id).emit('rooms', rooms);
    } catch {
      return this.disconnect(socket);
    }
  }

  async handleDisconnect(socket: Socket) {
    await this.connectedUserService.deleteBySocketId(socket.id);
    socket.disconnect();
  }

  private disconnect(socket: Socket) {
    socket.emit('Error', new UnauthorizedException());
    socket.disconnect();
  }

  private handleIncomingPageRequest(page: Page) {
    page.limit = page.limit > 100 ? 100 : page.limit;
    page.page = page.page + 1;
    return page;
  }

  @SubscribeMessage('paginateRooms')
  async onPaginateRoom(socket: Socket, page: Page) {
    const rooms = await this.roomService.getUserRooms(
      socket.data.user.id,
      this.handleIncomingPageRequest(page),
    );

    rooms.meta.currentPage = rooms.meta.currentPage - 1;
    return this.server.to(socket.id).emit('rooms', rooms);
  }

  @SubscribeMessage('createRoom')
  async onCreateRoom(socket: Socket, room: RoomModel) {
    const createdRoom: RoomModel = await this.roomService.createRoom(
      room,
      socket.data.user,
    );

    for (const user of createdRoom.users) {
      const connections: ConnectedUserModel[] =
        await this.connectedUserService.findByUser(user);

      const rooms = await this.roomService.getUserRooms(user.id, {
        page: 1,
        limit: 10,
      });

      rooms.meta.currentPage = rooms.meta.currentPage - 1;

      for (const connection of connections) {
        await this.server.to(connection.socketId).emit('rooms', rooms);
      }
    }
  }

  @SubscribeMessage('addMessage')
  async onAddMessage(socket: Socket, payload: { message: MessageModel }) {
    const { message } = payload;

    if (!!message.room.id) {
      message.room.users.push({ userId: socket.data.user.id } as RoomUser);
    }

    const createdMessage: MessageModel = await this.messageService.create({
      ...message,
      user: socket.data.user,
    });

    const roomUsers = await this.roomUserService.findByRoomId(
      createdMessage.room.id,
    );

    const connected = await this.connectedUserService.findByUserIds(
      roomUsers.map((roomUser) => roomUser.userId),
    );

    const reduced = roomUsers.reduce(
      (acc, curr) => ({
        ...acc,
        [curr.userId]: curr,
      }),
      {},
    );

    for (const user of connected) {
      delete reduced[user.userId];
      await this.server.to(user.socketId).emit('messageAdded', createdMessage);
    }

    // TODO: Notification push to users not connected
    const userNotConnected = Object.values(reduced);
  }
}
