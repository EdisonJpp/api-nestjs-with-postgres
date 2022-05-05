import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserModel } from '../../../modules/users/users.model';
import { RoomModel } from './room.model';

@Entity({ name: 't_chat_room_users' })
export class RoomUser {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'user_id' })
  userId?: number;

  @Column({ name: 'room_id' })
  roomId?: number;

  @ManyToOne(() => UserModel, {
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserModel;

  @ManyToOne(() => RoomModel, {
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'room_id' })
  room: RoomModel;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
