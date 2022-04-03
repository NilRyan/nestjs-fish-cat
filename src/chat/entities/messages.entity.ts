import { BaseModel } from './../../common/base.model';
import { Column, Entity, ManyToOne } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { ChatsEntity } from './chats.entity';

@Entity('messages')
export class MessagesEntity extends BaseModel {
  @ManyToOne((type) => ChatsEntity)
  chat: ChatsEntity;

  @ManyToOne((type) => UserEntity)
  author: UserEntity;

  @Column()
  message: string;
}
