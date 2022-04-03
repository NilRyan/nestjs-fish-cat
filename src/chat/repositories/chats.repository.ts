import { ChatsEntity } from './../entities/chats.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(ChatsEntity)
export class ChatsRepository extends Repository<ChatsEntity> {}
