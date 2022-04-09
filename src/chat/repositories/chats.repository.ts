import { UserEntity } from './../../users/entities/user.entity';
import { ChatsEntity } from './../entities/chats.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(ChatsEntity)
export class ChatsRepository extends Repository<ChatsEntity> {
  async createChat(participant: UserEntity, currentUser: UserEntity) {
    const chat = await this.save({
      createdBy: currentUser,
      participants: [currentUser, participant],
    });
    return chat;
  }
}
