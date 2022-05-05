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

@Entity({ name: 't_chat_connected_users' })
export class ConnectedUserModel {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'socket_id' })
  socketId: string;

  @Column({ name: 'user_id' })
  userId?: number;

  @ManyToOne(() => UserModel, (user) => user.connections)
  @JoinColumn({ name: 'user_id' })
  user: UserModel;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
