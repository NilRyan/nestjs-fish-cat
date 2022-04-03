import { MessagesEntity } from './messages.entity';
import { UserEntity as UsersEntity } from './../../users/entities/user.entity';
import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from '../../common/base.model';

@Entity('chats')
export class ChatsEntity extends BaseModel {
  @ManyToOne((type) => UsersEntity)
  createdBy: UsersEntity;

  @OneToMany((type) => MessagesEntity, (message) => message.chat, {
    nullable: true,
  })
  messages?: MessagesEntity;
}
