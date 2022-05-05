import { ApiProperty } from '@nestjs/swagger';
import { RoomUser } from '../../subscribers/chat/models/room-user.model';
import { MessageModel } from '../../subscribers/chat/models/message.model';
import { ConnectedUserModel } from '../../subscribers/chat/models/connected-user.model';

import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserModel {
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiProperty({ type: String })
  @Column()
  name?: string;

  @ApiProperty({ type: String })
  @Column({ name: 'last_name' })
  lastName?: string;

  @ApiProperty({ type: String })
  @Column({ unique: true })
  username?: string;

  @ApiProperty({ type: String })
  @Column({ unique: true })
  email?: string;

  @ApiProperty({ type: Number })
  @Column()
  phone?: number;

  @ApiProperty({ type: String })
  @Column()
  password?: string;

  @ManyToMany(() => RoomUser, (roomUser) => roomUser.user)
  rooms?: RoomUser[];

  @OneToMany(() => ConnectedUserModel, (connection) => connection.user)
  connections?: ConnectedUserModel[];

  @OneToMany(() => MessageModel, (message) => message.user)
  messages?: MessageModel[];

  @BeforeInsert()
  @BeforeUpdate()
  emailToLowerCase?() {
    this.email = this.email.toLowerCase();
    this.username = this.username.toLowerCase();
  }
}
