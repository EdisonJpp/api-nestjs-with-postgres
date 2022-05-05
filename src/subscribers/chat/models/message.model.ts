import { UserModel } from '../../../modules/users/users.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { RoomModel } from './room.model';

@Entity({ name: 't_chat_messages' })
export class MessageModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne(() => UserModel, (user) => user.messages, { cascade: true })
  @JoinColumn()
  user: UserModel;

  @ManyToOne(() => RoomModel, (room) => room.messages, { cascade: true })
  @JoinColumn()
  room: RoomModel;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
