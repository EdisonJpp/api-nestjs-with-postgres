import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MessageModel } from './message.model';
import { RoomUser } from './room-user.model';

@Entity({ name: 't_chat_rooms' })
export class RoomModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => RoomUser, (roomUser) => roomUser.room, { cascade: true })
  users: RoomUser[];

  @OneToMany(() => MessageModel, (message) => message.room)
  messages: MessageModel[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
